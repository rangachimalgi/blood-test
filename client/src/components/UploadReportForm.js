import React, { useState } from "react";
import axios from "axios";
import generateInvoice from "../components/generateInvoice.js"; // Update the path accordingly

const UploadReportForm = ({ orderId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/upload-report`,
        formData
      );
      if (response.status === 200) {
        alert("Report uploaded successfully!");
      } else {
        alert("Failed to upload report. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Error occurred while uploading report.");
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/orders/${orderId}`;
      console.log('API URL:', apiUrl); // Log the API URL for debugging
  
      // Fetch the order details and generate the invoice
      const response = await axios.get(apiUrl);
      console.log("API Response:", response); // Log the response for debugging
      const order = response.data;
      console.log("Fetched order:", order);

      // Check if the order object has the required fields
      if (!order || !order.cartItems || !Array.isArray(order.cartItems)) {
        console.error("Invalid order object:", order);
        return;
      }

      const doc = generateInvoice(order);
      const blob = doc.output("blob");
      const file = new File([blob], `${orderId}-invoice.pdf`, {
        type: "application/pdf",
      });
      setFile(file);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Report</button>
      </form>
      <button onClick={handleGenerateInvoice}>
        Generate and Upload Invoice
      </button>
    </div>
  );
};

export default UploadReportForm;
