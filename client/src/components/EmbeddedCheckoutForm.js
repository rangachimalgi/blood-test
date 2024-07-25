import React, { useState, useEffect } from 'react';
import { Button, InputGroup, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { availablePincodes } from '../components/availablePincodes.js';

const EmbeddedCheckoutForm = ({ CartItem, setCartItem }) => {
  const [orderData, setOrderData] = useState({
    pincode: '',
    name: '',
    email: '',
    address: '',
    phoneno: '',
    age: '',
    noOfPersons: 1,
    appointmentDate: '',
    beneficiaries: [],
  });
  const [pincodeMessage, setPincodeMessage] = useState('');

  useEffect(() => {
    setOrderData((prevState) => ({
      ...prevState,
      beneficiaries: Array.from({ length: prevState.noOfPersons }, () => ({
        name: '',
        age: '',
        gender: '',
      })),
    }));
  }, [orderData.noOfPersons]);

  const checkAvailability = () => {
    if (availablePincodes.includes(orderData.pincode)) {
      setPincodeMessage('Service is available in your pincode!');
    } else {
      setPincodeMessage('Sorry, service is not available in your pincode.');
    }
  };

  const handleBeneficiariesChange = (index, field, value) => {
    const newBeneficiaries = [...orderData.beneficiaries];
    newBeneficiaries[index] = { ...newBeneficiaries[index], [field]: value };
    setOrderData({ ...orderData, beneficiaries: newBeneficiaries });
  };

  const handleSubmitOrder = async () => {
    if (!availablePincodes.includes(orderData.pincode)) {
      alert('Service is not available in your pincode.');
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
      cartItems: CartItem,
    };

    console.log("Order Details: ", orderDetails); // Log the order details

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        orderDetails
      );
      if (response.data.success) {
        setCartItem([]);
        alert('Order submitted successfully!');
      } else {
        alert('Error submitting order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  const generateDateOptions = () => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      const dateString = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      options.push(
        <option key={i} value={dateString}>
          {dateString}
        </option>
      );
    }
    return options;
  };

  return (
    <Container className="embedded-checkout-form">
      <Row>
        <Col md={12}>
        <h3 className="form-heading">Booking Form</h3>
          <Form>
            <Form.Group controlId="formPincode">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Pincode"
                  value={orderData.pincode}
                  onChange={(e) =>
                    setOrderData({ ...orderData, pincode: e.target.value })
                  }
                  name="pincode"
                  className="form-control"
                />
                <Button variant="outline-secondary" onClick={checkAvailability}>
                  Check Availability
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">{pincodeMessage}</Form.Text>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={orderData.name}
                onChange={(e) =>
                  setOrderData({ ...orderData, name: e.target.value })
                }
                name="name"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={orderData.email}
                onChange={(e) =>
                  setOrderData({ ...orderData, email: e.target.value })
                }
                name="email"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={orderData.address}
                onChange={(e) =>
                  setOrderData({ ...orderData, address: e.target.value })
                }
                name="address"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNo">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone no"
                value={orderData.phoneno}
                onChange={(e) =>
                  setOrderData({ ...orderData, phoneno: e.target.value })
                }
                name="phoneno"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your age"
                value={orderData.age}
                onChange={(e) =>
                  setOrderData({ ...orderData, age: e.target.value })
                }
                name="age"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="formNoOfPersons">
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
                      (_, i) => orderData.beneficiaries[i] || { name: '', age: '', gender: '' }
                    ),
                  });
                }}
                name="noOfPersons"
                className="form-control"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAppointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                as="select"
                value={orderData.appointmentDate}
                onChange={(e) =>
                  setOrderData({ ...orderData, appointmentDate: e.target.value })
                }
                name="appointmentDate"
                className="form-control"
              >
                {generateDateOptions()}
              </Form.Control>
            </Form.Group>
            <h5>Beneficiaries</h5>
            {orderData.beneficiaries.map((beneficiary, index) => (
              <div key={index}>
                <Form.Group controlId={`formBeneficiaryName${index}`}>
                  <Form.Label>Beneficiary Name {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={beneficiary.name}
                    onChange={(e) =>
                      handleBeneficiariesChange(index, 'name', e.target.value)
                    }
                    name={`beneficiaryName${index}`}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId={`formBeneficiaryAge${index}`}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter age"
                    value={beneficiary.age}
                    onChange={(e) =>
                      handleBeneficiariesChange(index, 'age', e.target.value)
                    }
                    name={`beneficiaryAge${index}`}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId={`formBeneficiaryGender${index}`}>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={beneficiary.gender}
                    onChange={(e) =>
                      handleBeneficiariesChange(index, 'gender', e.target.value)
                    }
                    name={`beneficiaryGender${index}`}
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
              </div>
            ))}
            <Button variant="primary" onClick={handleSubmitOrder} className="confirm-button">
              Book Now
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmbeddedCheckoutForm;
