import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../App";
import { Col, Container, Row, Button } from "react-bootstrap";
import CheckoutForm from "../components/CheckoutForm.js";
import "./Cart.css"; // We'll create this file next

const Cart = () => {
  const { CartItem, setCartItem, addToCart, deleteProduct } =
    useContext(DataContainer);
  const [additionalTestCost, setAdditionalTestCost] = useState(0);

  const baseCartTotal = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  const totalPrice = baseCartTotal + additionalTestCost;

  const navigate = useNavigate();

  const decreaseQty = (product) => {
    const updatedCart = CartItem.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty - 1 } : item
    ).filter((item) => item.qty > 0);

    setCartItem(updatedCart);
    setTimeout(() => {
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
    }, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedCart = localStorage.getItem("cartItem");
    setCartItem(JSON.parse(storedCart) || []);
  }, []);

  const handleAddMoreTests = () => {
    navigate("/shop");
  };

  return (
    <section className="cart-page">
      <Container fluid className="px-4 py-2">
        <Row className="justify-content-center g-3">
          {/* Checkout Form */}
          <Col lg={7} className="checkout-form-column">
            <CheckoutForm
              show={true}
              handleClose={() => {}}
              CartItem={CartItem}
              setCartItem={setCartItem}
              setAdditionalTestCost={setAdditionalTestCost}
            />
          </Col>

          {/* Cart Summary */}
          <Col lg={4} className="cart-summary-column">
            <div className="cart-summary-container">
              <h4 className="cart-summary-title">Order Summary</h4>
              
              {CartItem.length === 0 ? (
                <div className="empty-cart-message">
                  <h5>Your cart is empty</h5>
                  <p>Add some tests to get started</p>
                  <Button
                    onClick={handleAddMoreTests}
                    className="add-tests-button"
                  >
                    Browse Tests
                  </Button>
                </div>
              ) : (
                <>
                  <div className="cart-items-list">
                    {CartItem.map((item) => {
                      const productQty = item.price * item.qty;
                      return (
                        <div className="cart-item-card" key={item.id}>
                          <div className="cart-item-image">
                            <img src={item.imgUrl} alt={item.productName} />
                          </div>
                          <div className="cart-item-details">
                            <h6 className="cart-item-name">{item.productName}</h6>
                            <p className="cart-item-price">
                              ₹{item.price} x {item.qty} = ₹{productQty}
                            </p>
                            <div className="cart-item-actions">
                              <Button
                                size="sm"
                                variant="outline-success"
                                className="action-button"
                                onClick={() => addToCart(item)}
                              >
                                +
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-warning"
                                className="action-button"
                                onClick={() => decreaseQty(item)}
                              >
                                –
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                className="action-button"
                                onClick={() => deleteProduct(item)}
                              >
                                🗑
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cart-summary-footer">
                    <div className="total-price">
                      <span>Total Amount:</span>
                      <span className="price">₹{totalPrice}</span>
                    </div>
                    <Button
                      onClick={handleAddMoreTests}
                      className="add-more-button"
                    >
                      Add More Tests
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
