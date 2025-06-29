import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { Col, Container, Row, Collapse } from "react-bootstrap";
import { healthPackagesArray } from "./HealthPackages";
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
    toast.success("Package has been added to cart!");
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
      <Banner title={selectedProduct?.productName} />
      <Container className="product-page">
        <Row>
          <Col md={8}>
            <div className="product-details-modern-card">
              <section>
                <Row className="align-items-center justify-content-center">
                  <Col md={6} className="product-details-img-col">
                    <div className="product-details-img-wrapper">
                      <img loading="lazy" src={selectedProduct?.imgUrl} alt={selectedProduct?.productName} className="product-details-img" />
                    </div>
                  </Col>
                  <Col md={6} className="product-details-info-col">
                    <h2 className="product-details-title">{selectedProduct?.productName}</h2>
                    <div className="product-details-meta">
                      <span className="product-details-mrp">₹{selectedProduct?.mrp}</span>
                      <span className="product-details-price">₹{selectedProduct?.price}</span>
                      <span className="product-details-category">{selectedProduct?.category}</span>
                    </div>
                    <p className="product-details-shortdesc">{selectedProduct?.shortDesc}</p>
                    <button className="product-details-add-btn" onClick={() => handleAdd(selectedProduct, quantity)} aria-label="Add to Cart">
                      <ion-icon name="cart-outline"></ion-icon> Add to Cart
                    </button>
                  </Col>
                </Row>
              </section>

              {/* Included Tests section */}
              {selectedProduct?.includedTests && selectedProduct.includedTests.length > 0 && (
                <section className="included-tests-modern mt-4">
                  <h3>Included Tests</h3>
                  {selectedProduct.includedTests.map((category) => (
                    <div key={category.categoryName} className="included-tests-category">
                      <h4
                        className="included-tests-category-title"
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
                        <ion-icon name={openCategoryId === category.categoryName ? 'chevron-down-outline' : 'chevron-forward-outline'}></ion-icon>
                        {category.categoryName.toUpperCase()}
                      </h4>
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
