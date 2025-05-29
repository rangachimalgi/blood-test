import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";

const ManageTests = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tests, setTests] = useState([]);

  const fetchTests = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tests`);
      setTests(res.data);
    } catch (err) {
      console.error("Error fetching tests:", err);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleAddTest = async () => {
    try {
      const testData = {
        id: Date.now().toString(), // temp ID
        productName,
        category,
        price: Number(price),
        type: "product",
        imgUrl, // now dynamic!
        description,
        shortDesc,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/tests`, testData);

      // Reset form
      setProductName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setShortDesc("");
      setImgUrl("");
      fetchTests();
    } catch (err) {
      console.error("Error adding test:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Test</h3>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Test Name</Form.Label>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Full Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleAddTest}>Add Test</Button>
      </Form>

      <h4 className="mt-4">All Tests</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Test Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{test.productName}</td>
              <td>{test.category}</td>
              <td>{test.price}</td>
              <td>
                {test.imgUrl && (
                  <img
                    src={test.imgUrl}
                    alt={test.productName}
                    style={{ width: "50px", height: "auto" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageTests;
