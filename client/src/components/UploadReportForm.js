import React, { useState } from "react";
import axios from "axios";

function UploadReportForm({ orderId, onReportUpload }) {
  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append("report", file);
    });

    console.log("API BASE URL:", process.env.REACT_APP_API_URL);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/upload-report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Report uploaded successfully!");
      onReportUpload();
      console.log("API BASE URL:", process.env.REACT_APP_API_URL);
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Error uploading report. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        name="report"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Upload Report</button>
    </form>
    );
  }
  export default UploadReportForm;
