import React, { Fragment, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedHealthPackage = healthPackagesArray.find(
      (packageItem) => packageItem.id === id
    );
    setSelectedProduct(selectedHealthPackage);
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

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <Container className="product-page">
        <Row>
          <Col md={8}>
            <div className="product-box">
              <section>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <img loading="lazy" src={selectedProduct?.imgUrl} alt="" />
                  </Col>
                  <Col md={6}>
                  <h2 style={{ fontSize: '17px', fontWeight: '700' }}>{selectedProduct?.productName}</h2>

                    {/* CHANGED: Display MRP with a strikethrough and discounted price */}
                    <div className="price-box">
                      <span className="mrp">&#8377;{selectedProduct?.mrp}</span> {/* MRP with strikethrough */}
                      <span className="discounted-price">&#8377;{selectedProduct?.price}</span> {/* Discounted price */}
                    </div>

                    <span>Category: {selectedProduct?.category}</span>
                    <p>{selectedProduct?.shortDesc}</p>

                    {/* Add Quantity and Add to Cart button here if needed */}
                    {/* 
                    <input
                      className="qty-input"
                      type="number"
                      placeholder="Qty"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <button
                      aria-label="Add"
                      type="submit"
                      className="add"
                      onClick={() => handleAdd(selectedProduct, quantity)}
                    >
                      Add To Cart
                    </button>
                    */}
                  </Col>
                </Row>
              </section>

              {/* Included Tests section */}
              {selectedProduct?.includedTests &&
                selectedProduct.includedTests.length > 0 && (
                  <section className="included-tests">
                    <Container>
                      <h3>Included Tests</h3>
                      {selectedProduct.includedTests.map((category) => (
                        <div key={category.categoryName} className="category-box">
                          <h4
                            onClick={() =>
                              setOpenCategoryId(
                                openCategoryId !== category.categoryName
                                  ? category.categoryName
                                  : null
                              )
                            }
                            className="category-title"
                          >
                            <span className="toggle-icon">
                              {openCategoryId === category.categoryName ? "-" : "+"}
                            </span>
                            {category.categoryName.toUpperCase()}
                          </h4>

                          <Collapse in={openCategoryId === category.categoryName}>
                            <div className="test-list">
                              {category.tests.map((testName, index) => (
                                <div key={index} className="test-item">
                                  {testName.toUpperCase()}
                                </div>
                              ))}
                            </div>
                          </Collapse>
                        </div>
                      ))}
                    </Container>
                  </section>
                )}

              <section className="product-reviews">
                <Container>
                  <ul>
                    <li>Description</li>
                  </ul>
                  <p>{selectedProduct?.description}</p>
                </Container>
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
