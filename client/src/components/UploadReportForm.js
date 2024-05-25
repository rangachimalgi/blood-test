import React, { useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Report</button>
      </form>
    </div>
  );
};

export default UploadReportForm;
