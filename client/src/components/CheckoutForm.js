import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { availablePincodes } from "../components/availablePincodes.js";
import "./CheckoutForm.css"; // We'll create this file next

const CheckoutForm = ({
  show,
  handleClose,
  CartItem,
  setCartItem,
  setAdditionalTestCost,
}) => {
  const [orderData, setOrderData] = useState({
    pincode: "",
    name: "",
    email: "",
    address: "",
    phoneno: "",
    age: "",
    noOfPersons: 1,
    appointmentDate: "",
    beneficiaries: [],
    tests: [], // Separate tests array for the order
  });
  const [pincodeMessage, setPincodeMessage] = useState("");
  const testPrices = {
    "Fasting Blood Sugar (FBS)": 80,
    "CRP Test": 480,
    "ESR Test": 120,
    "Covid Antibody IgG": 400,
    "Complete Urine Analysis": 510,
    "Troponin - Heart Attack Risk Test (ACTNI)": 650,
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatted = tomorrow.toLocaleDateString("en-CA"); // yyyy-mm-dd
    setOrderData((prev) => ({
      ...prev,
      appointmentDate: formatted,
    }));
  }, []);

  useEffect(() => {
    setOrderData((prevState) => ({
      ...prevState,
      beneficiaries: Array.from({ length: prevState.noOfPersons }, () => ({
        name: "",
        age: "",
        gender: "",
      })),
    }));
  }, [orderData.noOfPersons]);

  const checkAvailability = () => {
    if (availablePincodes.includes(orderData.pincode)) {
      setPincodeMessage("Service is available in your pincode!");
    } else {
      setPincodeMessage("Sorry, service is not available in your pincode.");
    }
  };

  const handleBeneficiariesChange = (index, field, value) => {
    const newBeneficiaries = [...orderData.beneficiaries];
    newBeneficiaries[index] = { ...newBeneficiaries[index], [field]: value };
    setOrderData({ ...orderData, beneficiaries: newBeneficiaries });
  };

  const handleTestChange = (test, isChecked) => {
    let updatedTests = [...orderData.tests];

    if (isChecked) {
      if (!updatedTests.includes(test)) {
        updatedTests.push(test);
      }
    } else {
      updatedTests = updatedTests.filter((t) => t !== test);
    }

    // recalculate cost
    const newCost = updatedTests.reduce(
      (sum, t) => sum + (testPrices[t] || 0),
      0
    );

    setOrderData({ ...orderData, tests: updatedTests });
    setAdditionalTestCost(newCost);
  };

  useEffect(() => {
    // Calculate total additional price when tests or person count changes
    const totalTestCost =
      orderData.tests.reduce((sum, test) => sum + (testPrices[test] || 0), 0) *
      orderData.noOfPersons;

    localStorage.setItem("additionalTests", JSON.stringify(orderData.tests));
    localStorage.setItem("additionalTestCost", totalTestCost.toString());
    localStorage.setItem("noOfPersons", orderData.noOfPersons.toString());
  }, [orderData.tests, orderData.noOfPersons]);

  const handleSubmitOrder = async () => {
    if (!availablePincodes.includes(orderData.pincode)) {
      alert("Service is not available in your pincode.");
      return;
    }

    const orderDetails = {
      pincode: orderData.pincode,
      name: orderData.name,
      email: orderData.email,
      address: orderData.address,
      phoneno: orderData.phoneno,
      age: orderData.age,
      noOfPersons: orderData.noOfPersons,
      appointmentDate: orderData.appointmentDate,
      beneficiaries: orderData.beneficiaries,
      tests: orderData.tests, // Include tests here
      cartItems: CartItem,
    };

    console.log("Order Details: ", orderDetails); // Add this line to log order details

    // Log the size of the payload
    const payloadSize = JSON.stringify(orderDetails).length;
    console.log(`Payload size: ${payloadSize} bytes`);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        orderDetails
      );
      if (response.data.success) {
        setCartItem([]);
        localStorage.removeItem("cartItem"); // clear localStorage cart
        setOrderData({
          pincode: "",
          name: "",
          email: "",
          address: "",
          phoneno: "",
          age: "",
          noOfPersons: 1,
          appointmentDate: "",
          beneficiaries: [],
          tests: [],
        });
        setAdditionalTestCost?.(0); // reset test cost if passed from parent
        handleClose();
        alert("Order submitted successfully!");
      } else {
        alert("Error submitting order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    }
  };

  const generateDateOptions = () => {
    const options = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start from tomorrow

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate); // ✅ clone instead of mutating
      date.setDate(startDate.getDate() + i);

      const dateString = date.toLocaleDateString("en-CA"); // using "YYYY-MM-DD" format

      options.push(
        <option key={i} value={dateString}>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="checkout-form-container">
      <div className="checkout-form-wrapper">
        <h3 className="form-title">Complete Your Booking</h3>
        <Form className="modern-form">
          <div className="form-section">
            <Form.Group controlId="formPincode" className="form-group-custom">
              <Form.Label>Pincode</Form.Label>
              <InputGroup className="custom-input-group">
                <Form.Control
                  type="text"
                  placeholder="Enter Pincode"
                  value={orderData.pincode}
                  onChange={(e) =>
                    setOrderData({ ...orderData, pincode: e.target.value })
                  }
                  name="pincode"
                  className="custom-input"
                />
                <Button 
                  variant="primary" 
                  onClick={checkAvailability}
                  className="check-availability-btn"
                >
                  Check Availability
                </Button>
              </InputGroup>
              <Form.Text className={`availability-message ${pincodeMessage.includes("available") ? "success" : "error"}`}>
                {pincodeMessage}
              </Form.Text>
            </Form.Group>

            <div className="form-row">
              <Form.Group controlId="formName" className="form-group-custom">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={orderData.name}
                  onChange={(e) =>
                    setOrderData({ ...orderData, name: e.target.value })
                  }
                  name="name"
                  className="custom-input"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="form-group-custom">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={orderData.email}
                  onChange={(e) =>
                    setOrderData({ ...orderData, email: e.target.value })
                  }
                  name="email"
                  className="custom-input"
                />
              </Form.Group>
            </div>

            <Form.Group controlId="formAddress" className="form-group-custom">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={orderData.address}
                onChange={(e) =>
                  setOrderData({ ...orderData, address: e.target.value })
                }
                name="address"
                className="custom-input"
              />
            </Form.Group>

            <div className="form-row">
              <Form.Group controlId="formPhoneNo" className="form-group-custom">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  value={orderData.phoneno}
                  onChange={(e) =>
                    setOrderData({ ...orderData, phoneno: e.target.value })
                  }
                  name="phoneno"
                  className="custom-input"
                />
              </Form.Group>

              <Form.Group controlId="formAge" className="form-group-custom">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your age"
                  value={orderData.age}
                  onChange={(e) =>
                    setOrderData({ ...orderData, age: e.target.value })
                  }
                  name="age"
                  className="custom-input"
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId="formNoOfPersons" className="form-group-custom">
                <Form.Label>Number of Persons</Form.Label>
                <Form.Control
                  as="select"
                  value={orderData.noOfPersons}
                  onChange={(e) => {
                    const newNoOfPersons = parseInt(e.target.value, 10);
                    setOrderData({
                      ...orderData,
                      noOfPersons: newNoOfPersons,
                      beneficiaries: Array.from(
                        { length: newNoOfPersons },
                        (_, i) =>
                          orderData.beneficiaries[i] || {
                            name: "",
                            age: "",
                            gender: "",
                          }
                      ),
                    });
                  }}
                  name="noOfPersons"
                  className="custom-select select-field"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className="warning-text">
                  Note: The same set of tests/packages will be added for all persons.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formAppointmentDate" className="form-group-custom">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  as="select"
                  value={orderData.appointmentDate}
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      appointmentDate: e.target.value,
                    })
                  }
                  name="appointmentDate"
                  className="custom-select select-field"
                >
                  {generateDateOptions()}
                </Form.Control>
              </Form.Group>
            </div>

            <div className="beneficiaries-section">
              <h4 className="section-title">Beneficiaries Information</h4>
              {orderData.beneficiaries.map((beneficiary, index) => (
                <div key={index} className="beneficiary-card">
                  <h5 className="beneficiary-title">Person {index + 1}</h5>
                  <div className="form-row">
                    <Form.Group controlId={`formBeneficiaryName${index}`} className="form-group-custom">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={beneficiary.name}
                        onChange={(e) =>
                          handleBeneficiariesChange(index, "name", e.target.value)
                        }
                        name={`beneficiaryName${index}`}
                        className="custom-input"
                      />
                    </Form.Group>

                    <Form.Group controlId={`formBeneficiaryAge${index}`} className="form-group-custom">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter age"
                        value={beneficiary.age}
                        onChange={(e) =>
                          handleBeneficiariesChange(index, "age", e.target.value)
                        }
                        name={`beneficiaryAge${index}`}
                        className="custom-input"
                      />
                    </Form.Group>

                    <Form.Group controlId={`formBeneficiaryGender${index}`} className="form-group-custom">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        value={beneficiary.gender}
                        onChange={(e) =>
                          handleBeneficiariesChange(index, "gender", e.target.value)
                        }
                        name={`beneficiaryGender${index}`}
                        className="custom-select select-field"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              ))}
            </div>

            <div className="additional-tests-section">
              <h4 className="section-title">Additional Tests (Optional)</h4>
              <div className="tests-grid">
                <Form.Check
                  type="checkbox"
                  label="Fasting Blood Sugar (FBS) @ Rs. 80 / Person"
                  checked={orderData.tests.includes("Fasting Blood Sugar (FBS)")}
                  onChange={(e) =>
                    handleTestChange("Fasting Blood Sugar (FBS)", e.target.checked)
                  }
                  className="custom-checkbox"
                />
                <Form.Check
                  type="checkbox"
                  label="CRP Test @ Rs. 480 / Person"
                  checked={orderData.tests.includes("CRP Test")}
                  onChange={(e) => handleTestChange("CRP Test", e.target.checked)}
                  className="custom-checkbox"
                />
                <Form.Check
                  type="checkbox"
                  label="ESR Test @ Rs. 120 / Person"
                  checked={orderData.tests.includes("ESR Test")}
                  onChange={(e) => handleTestChange("ESR Test", e.target.checked)}
                  className="custom-checkbox"
                />
                <Form.Check
                  type="checkbox"
                  label="Covid Antibody IgG @ Rs. 400 / Person"
                  checked={orderData.tests.includes("Covid Antibody IgG")}
                  onChange={(e) =>
                    handleTestChange("Covid Antibody IgG", e.target.checked)
                  }
                  className="custom-checkbox"
                />
                <Form.Check
                  type="checkbox"
                  label="Complete Urine Analysis @ Rs. 510 / Person"
                  checked={orderData.tests.includes("Complete Urine Analysis")}
                  onChange={(e) =>
                    handleTestChange("Complete Urine Analysis", e.target.checked)
                  }
                  className="custom-checkbox"
                />
                <Form.Check
                  type="checkbox"
                  label="Troponin - Heart Attack Risk Test (ACTNI) @ Rs. 650 / Person"
                  checked={orderData.tests.includes(
                    "Troponin - Heart Attack Risk Test (ACTNI)"
                  )}
                  onChange={(e) =>
                    handleTestChange(
                      "Troponin - Heart Attack Risk Test (ACTNI)",
                      e.target.checked
                    )
                  }
                  className="custom-checkbox"
                />
              </div>
            </div>
          </div>
        </Form>
        <div className="submit-section">
          <Button
            onClick={handleSubmitOrder}
            className="submit-button"
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
