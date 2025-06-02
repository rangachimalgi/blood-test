import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const ManagePackages = () => {
  const [packageData, setPackageData] = useState({
    productName: "",
    desc: "",
    category: "",
    price: "",
    mrp: "",
    shortDesc: "",
    description: "",
    includedTests: [],
  });

  const [currentCategory, setCurrentCategory] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testList, setTestList] = useState([]);

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

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...packageData,
    id: Date.now().toString(),
    type: "package",
    imgUrl: "populartest01.avif", // replace with upload logic later
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
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/packages`, payload);
    alert("✅ Package saved!");
    console.log("Response:", res.data);

    // Reset form
    setPackageData({
      productName: "",
      desc: "",
      category: "",
      price: "",
      mrp: "",
      shortDesc: "",
      includedTests: [],
    });
    setTestList([]);
    setCurrentCategory("");
  } catch (err) {
    console.error("❌ Error submitting package:", err.message);
    alert("❌ Failed to save package");
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create Health Package</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            type="text"
            value={packageData.productName}
            onChange={(e) =>
              setPackageData({ ...packageData, productName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            type="text"
            value={packageData.shortDesc}
            onChange={(e) =>
              setPackageData({ ...packageData, shortDesc: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={packageData.desc}
            onChange={(e) =>
              setPackageData({ ...packageData, desc: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={packageData.category}
            onChange={(e) =>
              setPackageData({ ...packageData, category: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>MRP</Form.Label>
          <Form.Control
            type="number"
            value={packageData.mrp}
            onChange={(e) =>
              setPackageData({ ...packageData, mrp: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={packageData.price}
            onChange={(e) =>
              setPackageData({ ...packageData, price: e.target.value })
            }
          />
        </Form.Group>

        <Card className="mb-3 p-3">
          <h5>Add Test Category</h5>
          <Form.Group className="mb-2">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Tests (add one by one)</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
              />
              <Button
                className="ms-2"
                variant="secondary"
                onClick={handleAddTest}
              >
                + Add
              </Button>
            </div>
            <ul className="mt-2">
              {testList.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
          </Form.Group>
          <Button variant="success" onClick={handleAddCategory}>
            ✅ Add Category with Tests
          </Button>
        </Card>

        <Button type="submit" variant="primary">
          Save Package
        </Button>
      </Form>

      <hr />
      <h5>Preview Structure:</h5>
      <pre className="bg-light p-3 rounded">
        {JSON.stringify(packageData, null, 2)}
      </pre>
    </div>
  );
};

export default ManagePackages;
