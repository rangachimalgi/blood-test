import Package from '../models/Package.js';

/**
 * Normalize names for comparison (case-insensitive, trim whitespace, remove test count suffixes and "WITH UTSH")
 */
const normalizeName = (name) => {
  if (!name) return '';
  return name
    .trim()
    .replace(/\s*\([0-9]+\s*(Test|Tests)\)\s*$/gi, '')
    .replace(/\s+with\s+utsh\s*$/gi, '')
    .trim()
    .toLowerCase();
};

/**
 * Sync package from Thyrocare - Update includedTests
 */
export const syncPackageFromThyrocare = async (req, res) => {
  try {
    const packageId = req.params.id;
    const packageToUpdate = await Package.findOne({ id: packageId });
    
    if (!packageToUpdate) {
      return res.status(404).json({ message: "Package not found in database" });
    }

    const apiUrl = process.env.THYROCARE_API_URL || 'https://www.thyrocare.com/api/master-data';
    
    console.log('🔍 Syncing package:', packageToUpdate.productName);

    // Fetch from Thyrocare API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(apiUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch from Thyrocare API',
        message: `HTTP ${response.status}: ${response.statusText}`,
      });
    }

    const data = await response.json();
    const allProfiles = data?.data?.master?.profile || [];

    // Search for matching package in Thyrocare
    const normalizedDbName = normalizeName(packageToUpdate.productName);
    const matchedPackage = allProfiles
      .filter(item => item.type === 'POP' || item.type === 'PROFILE')
      .find(item => normalizeName(item.name) === normalizedDbName);

    if (!matchedPackage) {
      return res.status(404).json({ message: "Package not found in Thyrocare API" });
    }

    // Convert Thyrocare childs to includedTests format
    const includedTests = [];
    if (matchedPackage.childs && matchedPackage.childs.length > 0) {
      const groupedByCategory = {};
      
      matchedPackage.childs.forEach(child => {
        const groupName = child.groupName || 'UNCATEGORIZED';
        if (!groupedByCategory[groupName]) {
          groupedByCategory[groupName] = [];
        }
        groupedByCategory[groupName].push(child.name);
      });

      Object.keys(groupedByCategory).forEach(groupName => {
        const tests = groupedByCategory[groupName];
        const testCount = tests.length;
        // Add "(Includes X Tests)" automatically with proper capitalization (I and T caps)
        const categoryName = `${groupName} (Includes ${testCount} ${testCount === 1 ? 'Test' : 'Tests'})`;
        includedTests.push({
          categoryName: categoryName,
          tests: tests
        });
      });
    }

    // Extract category names helper
    const extractCategoryNames = (includedTests) => {
      if (!includedTests || includedTests.length === 0) {
        return [];
      }
      return includedTests.map(test => {
        let categoryName = test.categoryName || '';
        categoryName = categoryName.replace(/\s*\(Includes\s*\d+\s*Tests?\)/gi, '').trim();
        return categoryName;
      }).filter(Boolean);
    };

    // Generate desc, shortDesc, and overlayDetails from category names (description is manual)
    const categoryNames = extractCategoryNames(includedTests);
    
    const generateDesc = () => {
      return categoryNames.length > 0 ? `Tests Includes ${categoryNames.join(', ')}` : '';
    };
    
    const generateShortDesc = () => {
      return categoryNames.length > 0 ? `Includes ${categoryNames.join(', ')}` : '';
    };

    // Update the package (description stays as is, not auto-generated)
    packageToUpdate.includedTests = includedTests;
    packageToUpdate.desc = generateDesc();
    packageToUpdate.shortDesc = generateShortDesc();
    packageToUpdate.overlayDetails = categoryNames;
    const updatedPackage = await packageToUpdate.save();

    console.log('✅ Synced package with Thyrocare data');

    res.json({
      message: "Package synced successfully",
      package: updatedPackage
    });
  } catch (error) {
    console.error('❌ Error syncing package:', error.message);
    return res.status(500).json({
      error: 'Failed to sync package',
      message: error.message
    });
  }
};

/**
 * Search for a package in Thyrocare by name
 */
export const searchThyrocarePackage = async (req, res) => {
  try {
    const searchName = req.query.name;
    if (!searchName) {
      return res.status(400).json({ error: "Name query parameter is required" });
    }

    const apiUrl = process.env.THYROCARE_API_URL || 'https://www.thyrocare.com/api/master-data';
    
    console.log('🔍 Searching Thyrocare for package:', searchName);

    // Fetch from Thyrocare API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(apiUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch from Thyrocare API',
        message: `HTTP ${response.status}: ${response.statusText}`,
      });
    }

    const data = await response.json();
    const allProfiles = data?.data?.master?.profile || [];

    // Search for matching package
    const normalizedSearchName = normalizeName(searchName);
    const matchedPackage = allProfiles
      .filter(item => item.type === 'POP' || item.type === 'PROFILE')
      .find(item => normalizeName(item.name) === normalizedSearchName);

    if (!matchedPackage) {
      return res.status(404).json({ message: "Package not found in Thyrocare" });
    }

    // Convert Thyrocare format to our database format
    const convertedPackage = {
      name: matchedPackage.name,
      code: matchedPackage.code,
      type: matchedPackage.type,
      // Include price from rate.b2C if available
      price: matchedPackage.rate?.b2C ? parseInt(matchedPackage.rate.b2C) : 
             matchedPackage.price || matchedPackage.mrp || matchedPackage.amount || null,
      mrp: matchedPackage.rate?.b2C ? parseInt(matchedPackage.rate.b2C) : 
           matchedPackage.mrp || matchedPackage.price || matchedPackage.amount || null,
      // Include description if available
      description: matchedPackage.description || matchedPackage.desc || matchedPackage.descText || null,
      aliasName: matchedPackage.aliasName || null,
      rate: matchedPackage.rate || null, // Include full rate object if needed
      includedTests: []
    };

    // Group childs by groupName
    if (matchedPackage.childs && matchedPackage.childs.length > 0) {
      const groupedByCategory = {};
      
      matchedPackage.childs.forEach(child => {
        const groupName = child.groupName || 'UNCATEGORIZED';
        if (!groupedByCategory[groupName]) {
          groupedByCategory[groupName] = [];
        }
        groupedByCategory[groupName].push(child.name);
      });

      // Convert to our includedTests format with test count
      Object.keys(groupedByCategory).forEach(groupName => {
        const tests = groupedByCategory[groupName];
        const testCount = tests.length;
        convertedPackage.includedTests.push({
          categoryName: `${groupName} (Includes ${testCount} ${testCount === 1 ? 'Test' : 'Tests'})`,
          tests: tests
        });
      });
    }

    res.json(convertedPackage);
  } catch (error) {
    console.error('❌ Error searching Thyrocare package:', error.message);
    return res.status(500).json({
      error: 'Failed to search Thyrocare package',
      message: error.message
    });
  }
};

/**
 * Compare Thyrocare packages with database and return missing packages
 */
export const comparePackages = async (req, res) => {
  try {
    const apiUrl = req.body.apiUrl || process.env.THYROCARE_API_URL || 'https://www.thyrocare.com/api/master-data';
    
    console.log('🔍 Fetching Thyrocare packages...');

    // Fetch from Thyrocare API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(apiUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...req.body.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch from Thyrocare API',
        message: `HTTP ${response.status}: ${response.statusText}`,
        attemptedUrl: apiUrl
      });
    }

    const data = await response.json();
    const allProfiles = data?.data?.master?.profile || [];

    // Get all package names from Thyrocare (POP and PROFILE types)
    const thyrocarePackages = allProfiles
      .filter(item => item.type === 'POP' || item.type === 'PROFILE')
      .map(item => ({
        name: item.name,
        code: item.code,
        type: item.type
      }));

    console.log(`📦 Found ${thyrocarePackages.length} packages from Thyrocare`);

    // Get all packages from database
    const dbPackages = await Package.find({}, 'productName');

    console.log(`💾 Found ${dbPackages.length} packages in database`);

    // Normalize all database package names for comparison
    const normalizedDbPackageNames = dbPackages.map(pkg => normalizeName(pkg.productName)).filter(Boolean);

    console.log(`📊 Normalized ${normalizedDbPackageNames.length} database package names`);

    // Find missing packages (in Thyrocare but not in database)
    const missingPackages = thyrocarePackages
      .filter(thyrocarePkg => {
        const normalizedThyrocareName = normalizeName(thyrocarePkg.name);
        return !normalizedDbPackageNames.includes(normalizedThyrocareName);
      })
      .map(pkg => ({
        name: pkg.name,
        code: pkg.code,
        type: pkg.type
      }));

    // Find extra packages (in database but not in Thyrocare)
    const thyrocareNames = thyrocarePackages.map(pkg => normalizeName(pkg.name));
    const extraPackages = dbPackages
      .filter(dbPkg => {
        const normalizedDbName = normalizeName(dbPkg.productName);
        return normalizedDbName && !thyrocareNames.includes(normalizedDbName);
      })
      .map(pkg => ({
        name: pkg.productName,
        id: pkg.id || pkg._id
      }));

    console.log(`✅ Missing packages: ${missingPackages.length}`);
    console.log(`📊 Extra packages in DB: ${extraPackages.length}`);

    return res.status(200).json({
      success: true,
      summary: {
        thyrocareCount: thyrocarePackages.length,
        databaseCount: dbPackages.length,
        missingCount: missingPackages.length,
        extraCount: extraPackages.length
      },
      missingPackages: missingPackages,
      extraPackages: extraPackages
    });

  } catch (error) {
    console.error('❌ Error comparing packages:', error.message);
    return res.status(500).json({
      error: 'Failed to compare packages',
      message: error.message
    });
  }
};

