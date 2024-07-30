import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContainer } from '../App';
import { Col, Container, Row, Button } from 'react-bootstrap';
import CheckoutForm from '../components/CheckoutForm.js';

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const { CartItem, setCartItem, addToCart, decreaseQty, deleteProduct } =
    useContext(DataContainer);
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem('cartItem');
      setCartItem(JSON.parse(storedCart));
    }
  }, [CartItem, setCartItem]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddMoreTests = () => {
    navigate('/shop');
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
            )}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            {`\u20B9${item.price}.00`} * {item.qty}
                            <span>{`\u20B9${productQty}.00`}</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => addToCart(item)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => decreaseQty(item)}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => deleteProduct(item)}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="d_flex">
                <h4>Total Price :</h4>
                <h3>{`\u20B9${totalPrice}.00`}</h3>
              </div>
              <Button
                onClick={handleShow}
                style={{
                  marginTop: '15px',
                  backgroundColor: '#4CAF50',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  fontSize: '16px',
                }}
              >
                Book Now
              </Button>
              <Button
                onClick={handleAddMoreTests}
                style={{
                  marginTop: '15px',
                  backgroundColor: '#0F3460',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  fontSize: '16px',
                  marginLeft: '10px'
                }}
              >
                Add More Tests
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <CheckoutForm
        show={showModal}
        handleClose={handleClose}
        CartItem={CartItem}
        setCartItem={setCartItem}
      />
    </section>
  );
};

export default Cart;
