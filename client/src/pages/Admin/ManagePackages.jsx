import React, { useState, useEffect } from "react";
import { Form, Button, Card, Table, Alert, InputGroup } from "react-bootstrap";
import axios from "axios";

const ManagePackages = () => {
  const [packageData, setPackageData] = useState({
    productName: "",
    desc: "",
    category: "Basic", // Set Basic as default
    price: "",
    mrp: "",
    shortDesc: "",
    description: "",
    includedTests: [],
  });

  const [currentCategory, setCurrentCategory] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testList, setTestList] = useState([]);

  // View Packages states
  const [viewMode, setViewMode] = useState("create"); // "create" or "view"
  const [searchTerm, setSearchTerm] = useState("");
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleAddTest = () => {
    if (testInput.trim() === "") return;
    setTestList([...testList, testInput]);
    setTestInput("");
  };

  const handleAddCategory = () => {
    if (currentCategory.trim() === "" || testList.length === 0) return;
    const newCategory = {
      categoryName: currentCategory,
      tests: testList,
    };
    setPackageData({
      ...packageData,
      includedTests: [...packageData.includedTests, newCategory],
    });
    setCurrentCategory("");
    setTestList([]);
  };

  // Fetch all packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/packages`);
      setAllPackages(response.data);
      setFilteredPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      alert("Error fetching packages");
    } finally {
      setLoading(false);
    }
  };

  // Search packages by name
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (!searchValue.trim()) {
      setFilteredPackages([...allPackages]); // Create new array to force re-render
      return;
    }
    
    const searchTerm = searchValue.toLowerCase().trim();
    console.log('Searching for:', searchTerm);
    console.log('Total packages:', allPackages.length);
    
    const filtered = allPackages.filter(pkg => {
      const productName = pkg.productName?.toLowerCase() || '';
      const category = pkg.category?.toLowerCase() || '';
      const shortDesc = pkg.shortDesc?.toLowerCase() || '';
      
      const matches = productName.includes(searchTerm) || 
                      category.includes(searchTerm) || 
                      shortDesc.includes(searchTerm);
      
      if (matches) {
        console.log('Match found:', pkg.productName, 'because:', {
          productName: productName.includes(searchTerm),
          category: category.includes(searchTerm),
          shortDesc: shortDesc.includes(searchTerm)
        });
      }
      
      return matches;
    });
    
    console.log('Filtered results:', filtered.length);
    console.log('Setting filtered packages:', filtered.map(p => p.productName));
    setFilteredPackages([...filtered]); // Create new array to force re-render
  };

  // Check if package exists
  const checkPackageExists = (packageName) => {
    return allPackages.some(pkg => 
      pkg.productName.toLowerCase() === packageName.toLowerCase()
    );
  };

  // Edit package
  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPackageData({
      productName: pkg.productName,
      desc: pkg.description || pkg.desc,
      category: pkg.category,
      price: pkg.price.toString(),
      mrp: pkg.mrp.toString(),
      shortDesc: pkg.shortDesc,
      includedTests: pkg.includedTests || [],
    });
    setViewMode("create");
  };

  // Delete package
  const handleDeletePackage = async (packageId) => {
    if (!window.confirm("Are you sure you want to delete this package? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/packages/${packageId}`);
      alert("✅ Package deleted successfully!");
      fetchPackages(); // Refresh the list
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("❌ Failed to delete package");
    }
  };

  // Load packages when switching to view mode
  useEffect(() => {
    if (viewMode === "view" && allPackages.length === 0) {
      fetchPackages();
    }
  }, [viewMode]);

  // Debug: Log when filteredPackages changes
  useEffect(() => {
    console.log('filteredPackages state updated:', filteredPackages.length, 'packages');
    console.log('Current filtered packages:', filteredPackages.map(p => p.productName));
  }, [filteredPackages]);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if package already exists (only for new packages)
  if (!editingPackage && checkPackageExists(packageData.productName)) {
    alert("⚠️ Package with this name already exists! Please choose a different name.");
    return;
  }

  const payload = {
    ...packageData,
    category: "Basic", // Always set to Basic automatically
    id: editingPackage ? editingPackage.id : Date.now().toString(),
    type: "package",
    imgUrl: "GenaralHealthPackage.jpg", // Default image for all packages
    overlayTitle: packageData.productName,
    overlayDetails: packageData.includedTests.map((cat) => cat.categoryName),
    description: packageData.desc, // ✅ this ensures full desc is mapped
    discount: 30, // default
    avgRating: 4.5,
    reviews: [
      {
        rating: 4.7,
        text: "Highly recommended!",
      },
    ],
  };

  try {
    let res;
    if (editingPackage) {
      // Update existing package
      res = await axios.put(`${process.env.REACT_APP_API_URL}/api/packages/${editingPackage.id}`, payload);
      alert("✅ Package updated successfully!");
    } else {
      // Create new package
      res = await axios.post(`${process.env.REACT_APP_API_URL}/api/packages`, payload);
      alert("✅ Package saved!");
    }
    
    console.log("Response:", res.data);

    // Reset form
    setPackageData({
      productName: "",
      desc: "",
      category: "Basic", // Keep Basic as default
      price: "",
      mrp: "",
      shortDesc: "",
      includedTests: [],
    });
    setTestList([]);
    setCurrentCategory("");
    setEditingPackage(null);
    
    // Refresh packages list
    fetchPackages();
  } catch (err) {
    console.error("❌ Error submitting package:", err.message);
    alert("❌ Failed to save package");
  }
};


  return (
    <div className="container" style={{ marginTop: '120px', paddingTop: '20px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1" style={{ color: '#0F3460', fontWeight: '700' }}>Manage Health Packages</h2>
          <p className="text-muted mb-0">Create and manage your health packages</p>
        </div>
        <div className="btn-group shadow-sm" role="group">
          <Button
            variant={viewMode === "create" ? "primary" : "outline-primary"}
            onClick={() => setViewMode("create")}
            className="px-4 py-2"
            style={{ 
              borderRadius: viewMode === "create" ? '8px 0 0 8px' : '8px 0 0 8px',
              fontWeight: '600',
              border: '2px solid #0F3460'
            }}
          >
            <i className="fas fa-plus me-2"></i>Create Package
          </Button>
          <Button
            variant={viewMode === "view" ? "primary" : "outline-primary"}
            onClick={() => setViewMode("view")}
            className="px-4 py-2"
            style={{ 
              borderRadius: viewMode === "view" ? '0 8px 8px 0' : '0 8px 8px 0',
              fontWeight: '600',
              border: '2px solid #0F3460'
            }}
          >
            <i className="fas fa-search me-2"></i>View Packages
          </Button>
        </div>
      </div>

      {viewMode === "create" ? (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <div className="d-flex align-items-center mb-4">
            <div className={`rounded-circle p-3 me-3 ${editingPackage ? 'bg-warning' : 'bg-primary'}`}>
              <i className={`fas ${editingPackage ? 'fa-edit' : 'fa-plus'} text-white`}></i>
            </div>
            <div>
              <h4 className="mb-1" style={{ color: '#0F3460', fontWeight: '600' }}>
                {editingPackage ? `Edit Package: ${editingPackage.productName}` : 'Create New Package'}
              </h4>
              <p className="text-muted mb-0">
                {editingPackage ? 'Update the package details below' : 'Fill in the details to create a new health package'}
              </p>
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>Package Name</Form.Label>
          <Form.Control
            type="text"
            value={packageData.productName}
            onChange={(e) =>
              setPackageData({ ...packageData, productName: e.target.value })
            }
            className="border-2"
            style={{ borderRadius: '8px' }}
            placeholder="Enter package name..."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>Short Description</Form.Label>
          <Form.Control
            type="text"
            value={packageData.shortDesc}
            onChange={(e) =>
              setPackageData({ ...packageData, shortDesc: e.target.value })
            }
            className="border-2"
            style={{ borderRadius: '8px' }}
            placeholder="Brief description..."
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={packageData.desc}
            onChange={(e) =>
              setPackageData({ ...packageData, desc: e.target.value })
            }
            className="border-2"
            style={{ borderRadius: '8px' }}
            placeholder="Detailed description of the package..."
          />
        </Form.Group>
        
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>MRP (₹)</Form.Label>
              <Form.Control
                type="number"
                value={packageData.mrp}
                onChange={(e) =>
                  setPackageData({ ...packageData, mrp: e.target.value })
                }
                className="border-2"
                style={{ borderRadius: '8px' }}
                placeholder="Original price..."
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={packageData.price}
                onChange={(e) =>
                  setPackageData({ ...packageData, price: e.target.value })
                }
                className="border-2"
                style={{ borderRadius: '8px' }}
                placeholder="Discounted price..."
              />
            </Form.Group>
          </div>
        </div>

        <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
          <Card.Header className="bg-light border-0" style={{ borderRadius: '12px 12px 0 0' }}>
            <div className="d-flex align-items-center">
              <div className="bg-info rounded-circle p-2 me-3">
                <i className="fas fa-list text-white"></i>
              </div>
              <div>
                <h5 className="mb-1" style={{ color: '#0F3460', fontWeight: '600' }}>Add Test Categories</h5>
                <p className="text-muted mb-0 small">Organize tests into categories</p>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="p-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="border-2"
                style={{ borderRadius: '8px' }}
                placeholder="e.g., Blood Tests, Urine Tests..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold" style={{ color: '#0F3460' }}>Tests (add one by one)</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="border-2"
                  style={{ borderRadius: '8px' }}
                  placeholder="Enter test name..."
                />
                <Button
                  variant="outline-primary"
                  onClick={handleAddTest}
                  className="px-3"
                  style={{ borderRadius: '8px', fontWeight: '600' }}
                >
                  <i className="fas fa-plus me-1"></i>Add
                </Button>
              </div>
              {testList.length > 0 && (
                <div className="mt-3">
                  <h6 className="text-muted mb-2">Added Tests:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {testList.map((test, index) => (
                      <span key={index} className="badge bg-primary px-3 py-2" style={{ borderRadius: '20px' }}>
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Form.Group>
            <Button 
              variant="success" 
              onClick={handleAddCategory}
              className="px-4 py-2"
              style={{ borderRadius: '8px', fontWeight: '600' }}
              disabled={currentCategory.trim() === "" || testList.length === 0}
            >
              <i className="fas fa-check me-2"></i>Add Category with Tests
            </Button>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-between align-items-center">
          <Button 
            type="submit" 
            variant={editingPackage ? "warning" : "primary"}
            className="px-5 py-3"
            style={{ borderRadius: '8px', fontWeight: '600' }}
          >
            <i className={`fas ${editingPackage ? 'fa-save' : 'fa-save'} me-2`}></i>
            {editingPackage ? 'Update Package' : 'Save Package'}
          </Button>
          <div className="d-flex gap-2">
            {editingPackage && (
              <Button 
                type="button" 
                variant="outline-secondary"
                onClick={() => {
                  setEditingPackage(null);
                  setPackageData({
                    productName: "",
                    desc: "",
                    category: "Basic",
                    price: "",
                    mrp: "",
                    shortDesc: "",
                    includedTests: [],
                  });
                  setTestList([]);
                  setCurrentCategory("");
                }}
                className="px-4 py-3"
                style={{ borderRadius: '8px', fontWeight: '600' }}
              >
                <i className="fas fa-times me-2"></i>Cancel Edit
              </Button>
            )}
            <Button 
              type="button" 
              variant="outline-secondary"
              onClick={() => {
                setPackageData({
                  productName: "",
                  desc: "",
                  category: "Basic", // Reset to Basic default
                  price: "",
                  mrp: "",
                  shortDesc: "",
                  includedTests: [],
                });
                setTestList([]);
                setCurrentCategory("");
                setEditingPackage(null);
              }}
              className="px-4 py-3"
              style={{ borderRadius: '8px', fontWeight: '600' }}
            >
              <i className="fas fa-undo me-2"></i>Reset Form
            </Button>
          </div>
        </div>
      </Form>

          <hr className="my-4" />
          <div className="bg-light rounded-3 p-4">
            <h6 className="text-muted mb-3">
              <i className="fas fa-eye me-2"></i>Preview Structure
            </h6>
            <pre className="bg-white p-3 rounded border" style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>
              {JSON.stringify(packageData, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3 shadow-sm p-4">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-success rounded-circle p-3 me-3">
              <i className="fas fa-search text-white"></i>
            </div>
            <div>
              <h4 className="mb-1" style={{ color: '#0F3460', fontWeight: '600' }}>View Packages by Name</h4>
              <p className="text-muted mb-0">Search and manage existing packages</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="bg-light rounded-3 p-4 mb-4">
            <h6 className="text-muted mb-3">
              <i className="fas fa-filter me-2"></i>Search & Filter
            </h6>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search packages by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="border-2"
                style={{ borderRadius: '8px 0 0 8px' }}
              />
              <Button 
                variant="outline-secondary" 
                onClick={() => handleSearch("")}
                style={{ borderRadius: '0' }}
              >
                <i className="fas fa-times me-1"></i>Clear
              </Button>
              <Button 
                variant="outline-info" 
                onClick={fetchPackages}
                style={{ borderRadius: '0 8px 8px 0' }}
              >
                <i className="fas fa-sync me-1"></i>Refresh
              </Button>
            </InputGroup>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted">Loading packages...</p>
            </div>
          )}

          {/* Results */}
          {!loading && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Alert variant="info" className="mb-0 flex-grow-1 me-3">
                  <i className="fas fa-info-circle me-2"></i>
                  Found <strong>{filteredPackages.length}</strong> package(s)
                  {searchTerm && ` matching "${searchTerm}"`}
                </Alert>
                {filteredPackages.length > 0 && (
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => window.print()}
                    style={{ borderRadius: '8px' }}
                  >
                    <i className="fas fa-print me-1"></i>Print
                  </Button>
                )}
              </div>

              {filteredPackages.length > 0 ? (
                <div className="table-responsive">
                  <Table striped hover className="mb-0" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <thead className="table-dark">
                      <tr>
                        <th className="px-3 py-3">
                          <i className="fas fa-image me-2"></i>Image
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-tag me-2"></i>Package Name
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-folder me-2"></i>Category
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-rupee-sign me-2"></i>Price
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-tag me-2"></i>MRP
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-list me-2"></i>Tests
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-info me-2"></i>Description
                        </th>
                        <th className="px-3 py-3">
                          <i className="fas fa-cogs me-2"></i>Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPackages.map((pkg, index) => (
                        <tr key={`${pkg.id}-${index}-${searchTerm}`} className="align-middle">
                          <td className="px-3 py-3">
                            <div className="d-flex align-items-center">
                              <img 
                                src={`/Images/${pkg.imgUrl}`} 
                                alt={pkg.productName}
                                className="rounded"
                                style={{ 
                                  width: '50px', 
                                  height: '50px', 
                                  objectFit: 'cover',
                                  border: '2px solid #e9ecef'
                                }}
                                onError={(e) => {
                                  e.target.src = '/Images/GenaralHealthPackage.jpg';
                                }}
                              />
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <div>
                              <strong className="text-primary">{pkg.productName}</strong>
                              {pkg.productName.toLowerCase() === packageData.productName.toLowerCase() && (
                                <span className="badge bg-warning ms-2">
                                  <i className="fas fa-exclamation-triangle me-1"></i>Duplicate
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <span className="badge bg-secondary">{pkg.category}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-success fw-bold">₹{pkg.price}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="text-muted text-decoration-line-through">₹{pkg.mrp}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="badge bg-info">
                              {pkg.includedTests ? 
                                pkg.includedTests.reduce((total, cat) => total + cat.tests.length, 0) 
                                : 0
                              } tests
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <small className="text-muted">{pkg.shortDesc}</small>
                          </td>
                          <td className="px-3 py-3">
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEditPackage(pkg)}
                                style={{ borderRadius: '6px' }}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeletePackage(pkg.id)}
                                style={{ borderRadius: '6px' }}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-search text-muted" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h5 className="text-muted mb-2">No packages found</h5>
                  <p className="text-muted">
                    {searchTerm ? `No packages match "${searchTerm}"` : 'No packages available'}
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="outline-primary" 
                      onClick={() => handleSearch("")}
                      style={{ borderRadius: '8px' }}
                    >
                      <i className="fas fa-times me-1"></i>Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
