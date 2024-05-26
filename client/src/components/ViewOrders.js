import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadReportForm from "./UploadReportForm.js";
import "font-awesome/css/font-awesome.min.css";
import "../Styles/ViewOrders.css";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [hiddenReports, setHiddenReports] = useState([]);

  const hideReport = (orderId, reportLink) => {
    setHiddenReports((prevState) => [...prevState, { orderId, reportLink }]);
  };

  const sendReportsByEmail = async (orderId, Email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/send-reports-by-email`
      );
      if (response.status === 200) {
        alert(`Reports sent to ${Email} successfully!`);
      } else {
        alert("Failed to send reports. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending reports:", error);
      alert("Error occurred while sending reports.");
    }
  };

  const generateInvoice = async (orderId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders/${orderId}/generate-invoice`,
        {},
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice. Please try again.");
    }
  };

  const refreshOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/orders`
        );
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <div className="view-orders-container table-responsive">
      <h2 className="mb-4">Admin Panel - View Orders</h2>
      {orders.length === 0 ? (
        <p className="alert alert-info">No orders found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>PhoneNo</th>
              <th>Age</th>
              <th>Products</th>
              <th>Upload Report</th>
              <th>Status</th>
              <th>Report</th>
              <th>Download Reports</th>
              <th>Send Reports to user</th>
              <th>Generate Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>{order.phoneno}</td>
                <td>{order.age}</td>
                <td>
                  {order.cartItems.map((item) => item.productName).join(", ")}
                </td>
                <td>
                  <UploadReportForm
                    orderId={order._id}
                    onReportUpload={refreshOrders}
                  />
                </td>
                <td>{order.status}</td>
                <td>
                  {order.reports && order.reports.length > 0
                    ? order.reports.map(
                        (report) =>
                          !hiddenReports.some(
                            (hidden) =>
                              hidden.orderId === order._id &&
                              hidden.reportLink === report
                          ) && (
                            <div key={report} style={{ position: "relative" }}>
                              <a
                                className="styled-link"
                                href={`${process.env.REACT_APP_API_URL}${report}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Report
                              </a>
                              <button
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                }}
                                onClick={() => hideReport(order._id, report)}
                              >
                                x
                              </button>
                            </div>
                          )
                      )
                    : "Not uploaded"}
                </td>
                <td>
                  {order.reports && order.reports.length > 0 ? (
                    <a
                      className="styled-link"
                      href={`${process.env.REACT_APP_API_URL}/api/orders/${order._id}/download-reports`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download All Reports
                    </a>
                  ) : (
                    "No Reports"
                  )}
                </td>
                <td>
                  <button
                    className="custom-button"
                    onClick={() => sendReportsByEmail(order._id, order.email)}
                    disabled={!(order.reports && order.reports.length > 0)}
                  >
                    <i className="fa fa-envelope"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="custom-button"
                    onClick={() => generateInvoice(order._id)}
                  >
                    Generate Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewOrders;
