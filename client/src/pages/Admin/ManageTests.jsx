import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table, Card, Alert, InputGroup } from "react-bootstrap";

const ManageTests = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [viewMode, setViewMode] = useState("create"); // "create" or "view"

  const fetchTests = async () => {
    try {
      setLoading(true);
      console.log('Fetching tests...');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tests`);
      console.log('Tests fetched:', res.data.length, 'tests');
      setTests(res.data || []);
    } catch (err) {
      console.error("Error fetching tests:", err);
      setErrorMessage("Failed to fetch tests. Please try again.");
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  // Debug effect to log tests changes
  useEffect(() => {
    console.log('Tests updated:', tests.length, 'tests');
    tests.forEach((test, index) => {
      console.log(`Test ${index}:`, test.productName, 'ID:', test.id);
    });
  }, [tests]);

  const handleAddTest = async () => {
    if (!productName || !price) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const testData = {
        id: Date.now().toString(),
        productName,
        category: "Basic", // Always set to Basic
        price: Number(price),
        type: "product",
        imgUrl: "GenaralHealthPackage.jpg", // Constant default image
        description,
        shortDesc,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/tests`, testData);

      // Reset form
      setProductName("");
      setPrice("");
      setDescription("");
      setShortDesc("");
      
      setSuccessMessage("Test added successfully!");
      fetchTests();
    } catch (err) {
      console.error("Error adding test:", err);
      setErrorMessage("Failed to add test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setDescription("");
    setShortDesc("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Delete test
  const handleDeleteTest = async (testId) => {
    console.log("Delete button clicked for test ID:", testId);
    console.log("API URL:", process.env.REACT_APP_API_URL);
    
    if (!window.confirm("Are you sure you want to delete this test? This action cannot be undone.")) {
      console.log("Delete cancelled by user");
      return;
    }

    try {
      console.log("Starting delete request...");
      setLoading(true);
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/tests/${testId}`);
      console.log("Delete response:", response.data);
      setSuccessMessage("Test deleted successfully!");
      fetchTests(); // Refresh the tests list
    } catch (err) {
      console.error("Error deleting test:", err);
      setErrorMessage("Failed to delete test. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div 
      className="container-fluid" 
      style={{ 
        marginTop: '120px', 
        paddingTop: '20px',
        background: '#ffffff',
        minHeight: '100vh'
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="d-flex justify-content-between align-items-center"
              style={{
                background: '#ffffff',
                color: '#333',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '600', color: '#333' }}>
                  <i className="fas fa-flask me-3" style={{ color: '#0F3460' }}></i>
                  Manage Tests
                </h2>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#666' }}>
                  Add and manage individual health tests
                </p>
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
                  <i className="fas fa-plus me-2"></i>Create Test
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
                  <i className="fas fa-list me-2"></i>View Tests
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {successMessage && (
          <Alert variant="success" className="mb-4" dismissible onClose={() => setSuccessMessage("")}>
            <i className="fas fa-check-circle me-2"></i>
            {successMessage}
          </Alert>
        )}
        
        {errorMessage && (
          <Alert variant="danger" className="mb-4" dismissible onClose={() => setErrorMessage("")}>
            <i className="fas fa-exclamation-triangle me-2"></i>
            {errorMessage}
          </Alert>
        )}


        {viewMode === "create" ? (
          <div className="bg-white rounded-3 shadow-sm p-4">
            <div className="d-flex align-items-center mb-4">
              <div className="rounded-circle p-3 me-3 bg-primary">
                <i className="fas fa-plus text-white"></i>
              </div>
              <div>
                <h4 className="mb-1" style={{ color: '#333' }}>Add New Test</h4>
                <p className="text-muted mb-0">Create a new health test</p>
              </div>
            </div>
            
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '500', color: '#333' }}>
                      Test Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter test name"
                      style={{
                        border: '1px solid #e9ecef',
                        borderRadius: '4px',
                        padding: '10px 12px',
                        fontSize: '1rem'
                      }}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '500', color: '#333' }}>
                      Price (₹) *
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}>₹</InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        style={{
                          border: '1px solid #e9ecef',
                          borderRadius: '0 4px 4px 0',
                          padding: '10px 12px',
                          fontSize: '1rem'
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-3">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '500', color: '#333' }}>
                      Short Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      placeholder="Brief description of the test"
                      style={{
                        border: '1px solid #e9ecef',
                        borderRadius: '4px',
                        padding: '10px 12px',
                        fontSize: '1rem'
                      }}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: '500', color: '#333' }}>
                      Full Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed description of the test"
                      style={{
                        border: '1px solid #e9ecef',
                        borderRadius: '4px',
                        padding: '10px 12px',
                        fontSize: '1rem'
                      }}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex gap-3">
                <Button
                  onClick={handleAddTest}
                  disabled={loading}
                  variant="primary"
                  style={{
                    background: '#0F3460',
                    border: '1px solid #0F3460',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>
                      Adding...
                    </>
                  ) : (
                    'Add Test'
                  )}
                </Button>
                
                <Button
                  variant="outline-secondary"
                  onClick={resetForm}
                  style={{
                    border: '1px solid #6c757d',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div className="bg-white rounded-3 shadow-sm p-4">
            <div className="d-flex align-items-center mb-4">
              <div className="rounded-circle p-3 me-3 bg-info">
                <i className="fas fa-list text-white"></i>
              </div>
              <div>
                <h4 className="mb-1" style={{ color: '#333' }}>All Tests ({tests.length})</h4>
                <p className="text-muted mb-0">View and manage all health tests</p>
              </div>
            </div>
            
            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="outline-secondary"
                onClick={fetchTests}
                disabled={loading}
                style={{ borderRadius: '4px' }}
              >
                <i className="fas fa-sync-alt me-2"></i>
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <i className="fas fa-spinner fa-spin fa-2x text-primary mb-3"></i>
                <p className="text-muted">Loading tests...</p>
              </div>
            ) : tests.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-flask fa-2x text-muted mb-3"></i>
                <p className="text-muted">No tests found</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      <th style={{ border: 'none', padding: '1rem', fontWeight: '500', color: '#333' }}>#</th>
                      <th style={{ border: 'none', padding: '1rem', fontWeight: '500', color: '#333' }}>Test Name</th>
                      <th style={{ border: 'none', padding: '1rem', fontWeight: '500', color: '#333' }}>Price</th>
                      <th style={{ border: 'none', padding: '1rem', fontWeight: '500', color: '#333' }}>Image</th>
                      <th style={{ border: 'none', padding: '1rem', fontWeight: '500', color: '#333' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, index) => {
                      console.log(`Rendering test ${index}:`, test.productName, 'ID:', test.id);
                      return (
                      <tr key={test.id || `test-${index}`} style={{ borderBottom: '1px solid #e9ecef' }}>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>{index + 1}</td>
                        <td style={{ padding: '1rem' }}>
                          <div>
                            <div style={{ fontWeight: '500', color: '#333', marginBottom: '0.25rem' }}>
                              {test.productName}
                            </div>
                            {test.shortDesc && (
                              <small className="text-muted">{test.shortDesc}</small>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ fontWeight: '500', color: '#333', fontSize: '1rem' }}>
                            ₹{test.price}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {test.imgUrl ? (
                            <img
                              src={test.imgUrl.includes('/static/media/') 
                                ? `/Images/${test.imgUrl.split('/').pop()}` 
                                : test.imgUrl.startsWith('/Images/') 
                                  ? test.imgUrl 
                                  : `/Images/${test.imgUrl}`}
                              alt={test.productName}
                              style={{ 
                                width: '50px', 
                                height: '50px', 
                                objectFit: 'cover',
                                borderRadius: '4px',
                                border: '1px solid #e9ecef'
                              }}
                              onError={(e) => {
                                e.target.src = '/Images/blood-test-01.avif';
                              }}
                            />
                          ) : (
                            <div 
                              style={{
                                width: '50px',
                                height: '50px',
                                background: '#f8f9fa',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#6c757d',
                                border: '1px solid #e9ecef'
                              }}
                            >
                              <i className="fas fa-image"></i>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteTest(test.id)}
                            disabled={loading}
                            style={{
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              padding: '6px 12px'
                            }}
                          >
                            <i className="fas fa-trash me-1"></i>
                            Delete
                          </Button>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTests;
