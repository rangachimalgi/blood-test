import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContainer } from '../App';
import { Col, Container, Row, Button } from 'react-bootstrap';
import CheckoutForm from '../components/CheckoutForm.js';

const Cart = () => {
  const { CartItem, setCartItem, addToCart, decreaseQty, deleteProduct } = useContext(DataContainer);
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem('cartItem');
      setCartItem(JSON.parse(storedCart) || []);
    }
  }, [CartItem, setCartItem]);

  const handleAddMoreTests = () => {
    navigate('/shop');
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          {/* 🛒 Cart Items */}
          <Col md={8}>
            {CartItem.length === 0 ? (
              <h1 className="no-items product">No Items are added in Cart</h1>
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
                        <p>₹{item.price} x {item.qty} = ₹{productQty}</p>
                        <div className="d-flex gap-2">
                          <Button size="sm" onClick={() => addToCart(item)}>+</Button>
                          <Button size="sm" onClick={() => decreaseQty(item)}>-</Button>
                          <Button size="sm" variant="danger" onClick={() => deleteProduct(item)}>Remove</Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })
            )}
          </Col>

          {/* 📋 Checkout Form */}
          <Col md={4}>
            <div className="p-4 border rounded bg-light">
              <h4 className="mb-3">Cart Summary</h4>
              <p>Total Price: <strong>₹{totalPrice}</strong></p>
              <Button
                onClick={handleAddMoreTests}
                style={{
                  marginBottom: '20px',
                  backgroundColor: '#0F3460',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              >
                Add More Tests
              </Button>

              <hr className="my-4" />

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

export default Cart;
