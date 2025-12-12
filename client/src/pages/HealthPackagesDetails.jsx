import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { Col, Container, Row, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmbeddedCheckoutForm from "../components/EmbeddedCheckoutForm.js";
import "../Styles/productDetails.css";
import HeroImage from "../Images/HeroOr.png";
import CollectionImage from "../Images/Collection.png";
import DigitalReportImage from "../Images/DigitalReport.png";

const HealthPackageDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { selectedProduct, setSelectedProduct, addToCart } =
    useContext(DataContainer);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const { id } = useParams();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const fetchPackageById = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/packages/${id}`
        );
        setSelectedProduct(res.data);
        // Scroll to top again after content loads
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        });
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
    document
      .getElementById("checkout-form")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleLike = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  return (
    <Fragment>
      <Container className="product-page" style={{ marginTop: "150px" }}>
        <Row>
          <Col md={8}>
            <div className="product-details-modern-card">
              <section>
                <div className="product-details-info-full">
                  <h2 className="product-details-title">
                    {selectedProduct?.productName
                      ?.split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ") || selectedProduct?.productName}
                  </h2>
                  <div className="product-details-meta">
                    <span className="product-details-mrp">
                      ₹{selectedProduct?.mrp}
                    </span>
                    <span className="product-details-price">
                      ₹{selectedProduct?.price}
                    </span>
                  </div>
                  <button
                    className="product-details-add-btn"
                    onClick={() => handleAdd(selectedProduct, quantity)}
                    aria-label="Add to Cart"
                  >
                    <ion-icon name="cart-outline"></ion-icon> Add to Cart
                  </button>
                </div>
              </section>

              {/* Description section */}
              <section className="product-details-tabs mt-4">
                <ul className="product-details-tablist">
                  <li className="active">About this package</li>
                </ul>
                <p className="product-details-desc mt-2">
                  {selectedProduct?.description}
                </p>
              </section>

              {/* Precaution section */}
              <section className="precaution-section mt-4">
                <div className="precaution-container">
                  <div className="precaution-icon">
                    <ion-icon name="warning-outline"></ion-icon>
                  </div>
                  <div className="precaution-content">
                    <h4 className="precaution-title">Precaution</h4>
                    <p className="precaution-text">
                      Do not consume anything other than water for 8 - 10 hours
                      before the test.
                    </p>
                  </div>
                </div>
              </section>

              <section className="why-book-with-us mt-4">
                <h3 className="why-book-title">Why book with us?</h3>
                <div className="why-book-features">
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="shield-checkmark-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">100% Safe & Hygienic</span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="home-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">
                      Free Home Sample Pick Up
                    </span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="pricetag-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">Heavy Discounts</span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="document-text-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">View Reports Online</span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="card-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">Easy Payment Options</span>
                  </div>
                </div>
              </section>

              {/* Included Tests section */}
              {selectedProduct?.includedTests &&
                selectedProduct.includedTests.length > 0 && (
                  <section className="included-tests-modern mt-4">
                    <h2>Included tests</h2>
                    {selectedProduct.includedTests.map((category) => (
                      <div
                        key={category.categoryName}
                        className="included-tests-category"
                      >
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
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setOpenCategoryId(
                                openCategoryId !== category.categoryName
                                  ? category.categoryName
                                  : null
                              );
                            }
                          }}
                        >
                          <h4 className="included-tests-category-title">
                            {category.categoryName?.replace(
                              /\b(includes|tests?)\b/gi,
                              (match) => {
                                // Capitalize "Includes" and "Tests" properly
                                if (match.toLowerCase() === "includes")
                                  return "Includes";
                                if (match.toLowerCase() === "test")
                                  return "Test";
                                if (match.toLowerCase() === "tests")
                                  return "Tests";
                                return match;
                              }
                            ) || category.categoryName}
                          </h4>
                          <ion-icon
                            name={
                              openCategoryId === category.categoryName
                                ? "chevron-up-outline"
                                : "chevron-down-outline"
                            }
                            className="category-toggle-icon"
                          ></ion-icon>
                        </div>
                        <Collapse in={openCategoryId === category.categoryName}>
                          <ul className="included-tests-list">
                            {category.tests.map((testName, index) => (
                              <li key={index}>
                                {testName.charAt(0).toUpperCase() +
                                  testName.slice(1).toLowerCase()}
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </div>
                    ))}
                  </section>
                )}

              {/* How it works section */}
              <section className="how-it-works-section mt-4">
                <h3 className="how-it-works-title">How it works?</h3>
                <div className="how-it-works-cards">
                  <div className="how-it-works-card">
                    <div className="how-it-works-icon-wrapper">
                      <div className="how-it-works-step-number">1</div>
                      <div className="how-it-works-icon">
                        <ion-icon name="person-outline"></ion-icon>
                      </div>
                    </div>
                    <p className="how-it-works-text">
                      Technician will be assigned for a free home sample
                      collection after booking confirmation.
                    </p>
                  </div>
                  <div className="how-it-works-card">
                    <div className="how-it-works-icon-wrapper">
                      <div className="how-it-works-step-number">2</div>
                      <div className="how-it-works-icon">
                        <ion-icon name="home-outline"></ion-icon>
                      </div>
                    </div>
                    <p className="how-it-works-text">
                      Sample will be collected by our technician at your address
                      at given slot.
                    </p>
                  </div>
                  <div className="how-it-works-card">
                    <div className="how-it-works-icon-wrapper">
                      <div className="how-it-works-step-number">3</div>
                      <div className="how-it-works-icon">
                        <ion-icon name="mail-outline"></ion-icon>
                      </div>
                    </div>
                    <p className="how-it-works-text">
                      Soft copy reports will be sent to your email address
                      within 24 to 48 hours of samples reaching the lab.
                    </p>
                  </div>
                </div>
              </section>

              {/* Why Fortune Blood Test section */}
              <section className="why-fortune-section mt-4">
                <h3 className="why-fortune-title">About Thyrocare</h3>
                <div className="why-fortune-content">
                  <p className="why-fortune-text">
                    Thyrocare has an IT-enabled, 24*7, fully automated
                    diagnostic laboratory set up spanning over 200,000 sq. ft.
                    area for conducting error-free processing of 100,000+
                    specimens and 400,000+ clinical chemistry investigations per
                    night. A combination of air-cargo logistics and IT-enabled
                    barcoded bi-directional operating systems ensure quick
                    turnaround time for processing of samples that arrive at any
                    time of the day or night from various parts of the country
                    and help achieve this unmatched speed factor.
                  </p>
                </div>
              </section>

              {/* Why Book With Us Section */}
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
