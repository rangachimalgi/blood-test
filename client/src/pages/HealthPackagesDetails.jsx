import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { Col, Container, Row, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmbeddedCheckoutForm from "../components/EmbeddedCheckoutForm.js";
import "../Styles/productDetails.css";

const HealthPackageDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { selectedProduct, setSelectedProduct, addToCart } = useContext(DataContainer);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const { id } = useParams();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchPackageById = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/packages/${id}`
        );
        setSelectedProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch package by ID:", err);
      }
    };

    fetchPackageById();
  }, [id, setSelectedProduct]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAdd = (selectedProduct, quantity) => {
    addToCart(selectedProduct, quantity);
    // Removed toast notification
  };

  const scrollToCheckoutForm = () => {
    document.getElementById("checkout-form").scrollIntoView({ behavior: "smooth" });
  };

  const handleLike = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  return (
    <Fragment>
      <Container className="product-page" style={{ marginTop: '150px' }}>
        <Row>
          <Col md={8}>
            <div className="product-details-modern-card">
              <section>
                <div className="product-details-info-full">
                  <h2 className="product-details-title">{selectedProduct?.productName}</h2>
                  <div className="product-details-meta">
                    <span className="product-details-mrp">₹{selectedProduct?.mrp}</span>
                    <span className="product-details-price">₹{selectedProduct?.price}</span>
                  </div>
                  <button className="product-details-add-btn" onClick={() => handleAdd(selectedProduct, quantity)} aria-label="Add to Cart">
                    <ion-icon name="cart-outline"></ion-icon> Add to Cart
                  </button>
                </div>
              </section>

              {/* Included Tests section */}
              {selectedProduct?.includedTests && selectedProduct.includedTests.length > 0 && (
                <section className="included-tests-modern mt-4">
                  <h2>INCLUDED TESTS</h2>
                  {selectedProduct.includedTests.map((category) => (
                    <div key={category.categoryName} className="included-tests-category">
                      <div 
                        className="included-tests-category-header"
                        onClick={() =>
                          setOpenCategoryId(
                            openCategoryId !== category.categoryName
                              ? category.categoryName
                              : null
                          )
                        }
                        tabIndex={0}
                        role="button"
                        aria-label={`Toggle ${category.categoryName}`}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setOpenCategoryId(
                              openCategoryId !== category.categoryName
                                ? category.categoryName
                                : null
                            );
                          }
                        }}
                      >
                        <h4 className="included-tests-category-title">
                          {category.categoryName.toUpperCase()}
                        </h4>
                        <ion-icon 
                          name={openCategoryId === category.categoryName ? 'chevron-down-outline' : 'chevron-forward-outline'}
                          className="category-toggle-icon"
                        ></ion-icon>
                      </div>
                      <Collapse in={openCategoryId === category.categoryName}>
                        <ul className="included-tests-list">
                          {category.tests.map((testName, index) => (
                            <li key={index}>{testName.toUpperCase()}</li>
                          ))}
                        </ul>
                      </Collapse>
                    </div>
                  ))}
                </section>
              )}

              <section className="product-details-tabs mt-4">
                <ul className="product-details-tablist">
                  <li className="active">Description</li>
                </ul>
                <p className="product-details-desc mt-2">{selectedProduct?.description}</p>
              </section>
            </div>
          </Col>
          <Col md={4}>
            <div className="checkout-box form-container" id="checkout-form">
              <EmbeddedCheckoutForm
                CartItem={selectedProduct ? [selectedProduct] : []}
                setCartItem={setSelectedProduct}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <button
        className="fixed-book-appointment-button"
        onClick={scrollToCheckoutForm}
      >
        Book Appointment
      </button>
    </Fragment>
  );
};

export default HealthPackageDetails;
