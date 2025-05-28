import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import CheckoutForm from "./CheckoutForm";

const CheckoutPage = ({ CartItem, setCartItem, addToCart, decreaseQty, deleteProduct, handleAddMoreTests }) => {
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);

  return (
    <section className="checkout-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={7}>
            <h2 className="mb-4">🧾 Your Cart</h2>
            {CartItem.length === 0 ? (
              <h4 className="text-danger">No items in cart.</h4>
            ) : (
              CartItem.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list mb-3 p-3 border rounded" key={item.id}>
                    <Row>
                      <Col sm={4}>
                        <img src={item.imgUrl} alt="" className="img-fluid" />
                      </Col>
                      <Col sm={8}>
                        <h5>{item.productName}</h5>
                        <p>
                          ₹{item.price} x {item.qty} = ₹{productQty}
                        </p>
                        <div className="d-flex align-items-center gap-2">
                          <Button size="sm" onClick={() => addToCart(item)}>
                            +
                          </Button>
                          <Button size="sm" onClick={() => decreaseQty(item)}>
                            -
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteProduct(item)}
                          >
                            Remove
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })
            )}
          </Col>

          <Col md={5}>
            <div className="p-4 border rounded bg-light">
              <h4>🧮 Cart Summary</h4>
              <p>Total Price: <strong>₹{totalPrice}.00</strong></p>
              <Button
                variant="secondary"
                onClick={handleAddMoreTests}
                style={{ marginBottom: "20px" }}
              >
                Add More Tests
              </Button>

              <hr />
              <h4 className="mt-4 mb-3">📋 Checkout Form</h4>

              <CheckoutForm
                show={true}
                handleClose={() => {}}
                CartItem={CartItem}
                setCartItem={setCartItem}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CheckoutPage;
