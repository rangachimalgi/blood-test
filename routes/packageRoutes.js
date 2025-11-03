import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

/**
 * Extract clean category names from includedTests
 */
const extractCategoryNames = (includedTests) => {
  if (!includedTests || includedTests.length === 0) {
    return [];
  }
  
  return includedTests.map(test => {
    let categoryName = test.categoryName || '';
    // Remove patterns like "(Includes 5 Tests)" to get just the category name
    categoryName = categoryName.replace(/\s*\(Includes\s*\d+\s*Tests?\)/gi, '').trim();
    return categoryName;
  }).filter(Boolean);
};

/**
 * Generate desc from includedTests category names
 */
const generateDesc = (includedTests) => {
  const categoryNames = extractCategoryNames(includedTests);
  return categoryNames.length > 0 ? `Tests Includes ${categoryNames.join(', ')}` : '';
};

/**
 * Generate overlayDetails from includedTests category names
 */
const generateOverlayDetails = (includedTests) => {
  return extractCategoryNames(includedTests);
};

/**
 * Generate shortDesc from includedTests category names (shorter version)
 */
const generateShortDesc = (includedTests) => {
  const categoryNames = extractCategoryNames(includedTests);
  return categoryNames.length > 0 ? `Includes ${categoryNames.join(', ')}` : '';
};

/**
 * Generate description (long desc) from includedTests
 */
const generateDescription = (includedTests) => {
  const categoryNames = extractCategoryNames(includedTests);
  if (categoryNames.length === 0) return '';
  
  // Count total tests
  const totalTests = includedTests.reduce((sum, test) => sum + (test.tests?.length || 0), 0);
  
  return `Comprehensive health package covering ${categoryNames.join(', ')}. This package includes ${totalTests} essential tests to assess your overall health and wellness.`;
};

// POST - create a package
router.post("/", async (req, res) => {
  try {
    // Auto-generate id if not provided
    if (!req.body.id || req.body.id.trim() === '') {
      let newId;
      let attempts = 0;
      const maxAttempts = 10;
      
      do {
        // Find all existing IDs and get the highest numeric one
        const packages = await Package.find({}, 'id').sort({ id: 1 });
        
        if (packages.length === 0) {
          // First package, start with "01"
          newId = '01';
        } else {
          // Find the highest numeric ID
          let maxNumber = 0;
          packages.forEach(pkg => {
            if (pkg.id) {
              const numericMatch = pkg.id.match(/(\d+)$/);
              if (numericMatch) {
                const number = parseInt(numericMatch[1]);
                if (number > maxNumber) {
                  maxNumber = number;
                }
              }
            }
          });
          
          // Increment and format with leading zero
          newId = String(maxNumber + 1).padStart(2, '0');
        }
        
        // Check if this ID already exists (to prevent duplicates)
        const exists = await Package.findOne({ id: newId });
        if (!exists) {
          break; // ID is unique, use it
        }
        
        attempts++;
        // If duplicate found, increment and try again
        const numericMatch = newId.match(/(\d+)$/);
        if (numericMatch) {
          const number = parseInt(numericMatch[1]);
          newId = String(number + 1).padStart(2, '0');
        } else {
          // Fallback to timestamp if pattern doesn't match
          newId = `PKG${Date.now()}`;
          break;
        }
      } while (attempts < maxAttempts);
      
      req.body.id = newId;
    }

    // Auto-update categoryName with test count "(Includes X Tests)"
    if (req.body.includedTests && req.body.includedTests.length > 0) {
      req.body.includedTests = req.body.includedTests.map(test => {
        const testCount = test.tests?.length || 0;
        // Remove existing "(Includes X Tests)" pattern and add correct count
        let categoryName = test.categoryName || '';
        categoryName = categoryName.replace(/\s*\(Includes\s*\d+\s*Tests?\)/gi, '').trim();
        if (categoryName && testCount > 0) {
          // Proper capitalization: "Includes" with capital I, "Tests" with capital T
          categoryName = `${categoryName} (Includes ${testCount} ${testCount === 1 ? 'Test' : 'Tests'})`;
        }
        return {
          ...test,
          categoryName: categoryName
        };
      });
    }

    // Auto-generate desc, shortDesc, and overlayDetails from includedTests (description is manual)
    if (req.body.includedTests && req.body.includedTests.length > 0) {
      if (!req.body.desc || req.body.desc.trim() === '') {
        req.body.desc = generateDesc(req.body.includedTests);
      }
      if (!req.body.shortDesc || req.body.shortDesc.trim() === '') {
        req.body.shortDesc = generateShortDesc(req.body.includedTests);
      }
      if (!req.body.overlayDetails || req.body.overlayDetails.length === 0) {
        req.body.overlayDetails = generateOverlayDetails(req.body.includedTests);
      }
    }
    
    const newPackage = new Package(req.body);
    const saved = await newPackage.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating package:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one package
router.get("/:id", async (req, res) => {
  try {
    const singlePackage = await Package.findOne({ id: req.params.id });
    if (!singlePackage)
      return res.status(404).json({ message: "Package not found" });

    res.json(singlePackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - update a package
router.put("/:id", async (req, res) => {
  try {
    // Auto-update categoryName with test count "(Includes X Tests)"
    if (req.body.includedTests && req.body.includedTests.length > 0) {
      req.body.includedTests = req.body.includedTests.map(test => {
        const testCount = test.tests?.length || 0;
        // Remove existing "(Includes X Tests)" pattern and add correct count
        let categoryName = test.categoryName || '';
        categoryName = categoryName.replace(/\s*\(Includes\s*\d+\s*Tests?\)/gi, '').trim();
        if (categoryName && testCount > 0) {
          // Proper capitalization: "Includes" with capital I, "Tests" with capital T
          categoryName = `${categoryName} (Includes ${testCount} ${testCount === 1 ? 'Test' : 'Tests'})`;
        }
        return {
          ...test,
          categoryName: categoryName
        };
      });
    }

    // Auto-generate desc, shortDesc, and overlayDetails from includedTests if they're being updated (description is manual)
    if (req.body.includedTests && req.body.includedTests.length > 0) {
      if (!req.body.desc || req.body.desc.trim() === '') {
        req.body.desc = generateDesc(req.body.includedTests);
      }
      if (!req.body.shortDesc || req.body.shortDesc.trim() === '') {
        req.body.shortDesc = generateShortDesc(req.body.includedTests);
      }
      if (!req.body.overlayDetails || req.body.overlayDetails.length === 0) {
        req.body.overlayDetails = generateOverlayDetails(req.body.includedTests);
      }
    }
    
    const updatedPackage = await Package.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    
    res.json(updatedPackage);
  } catch (err) {
    console.error("Error updating package:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - delete a package
router.delete("/:id", async (req, res) => {
  try {
    const deletedPackage = await Package.findOneAndDelete({ id: req.params.id });
    
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    
    res.json({ message: "Package deleted successfully", deletedPackage });
  } catch (err) {
    console.error("Error deleting package:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
