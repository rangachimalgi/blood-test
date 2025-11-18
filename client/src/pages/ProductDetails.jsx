import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { DataContainer } from "../App";
import { Col, Container, Row, Collapse } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import EmbeddedCheckoutForm from "../components/EmbeddedCheckoutForm.js";
import "../Styles/productDetails.css";
import HeroImage from "../Images/HeroOr.png";
import CollectionImage from "../Images/Collection.png";
import DigitalReportImage from "../Images/DigitalReport.png";

const ProductDetails = () => {
  const { addToCart } = useContext(DataContainer);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [listSelected, setListSelected] = useState("desc");
  const [precautionText, setPrecautionText] = useState("");

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/tests/${id}`
        );
        const data = await res.json();
        setSelectedProduct(data);
        // Scroll to top again after content loads
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        });
      } catch (err) {
        console.error("Failed to fetch product by ID:", err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!selectedProduct) return;

    if (selectedProduct.precaution) {
      setPrecautionText(selectedProduct.precaution);
      return;
    }

    const warningKeywords = ["fast", "fasting", "empty stomach", "overnight"];
    const calmKeywords = ["normal", "regular diet", "no special preparation"];

    const textSource =
      selectedProduct.description || selectedProduct.shortDesc || "";
    const lowerText = textSource.toLowerCase();

    let detected = "";
    if (warningKeywords.some((word) => lowerText.includes(word))) {
      detected =
        "Please fast for 8–10 hours before sample collection. Only water is allowed unless your doctor advises otherwise.";
    } else if (calmKeywords.some((word) => lowerText.includes(word))) {
      detected =
        "No special preparation is needed for this test. Follow your usual routine unless instructed otherwise by your doctor.";
    }
    setPrecautionText(detected);
  }, [selectedProduct]);

  const handleAdd = () => {
    addToCart(selectedProduct);
    // Navigate to shop page after adding to cart
    navigate("/shop");
  };

  const formattedProductName = useMemo(() => {
    if (!selectedProduct?.productName) return "";
    return selectedProduct.productName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }, [selectedProduct?.productName]);

  if (!selectedProduct) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <Fragment>
      <Container className="product-page" style={{ marginTop: "150px" }}>
        <Row>
          <Col md={8}>
            <div className="product-details-modern-card">
              <section>
                <div className="product-details-info-full">
                  <h2 className="product-details-title">
                    {formattedProductName || selectedProduct.productName}
                  </h2>
                  <div className="product-details-meta">
                    {selectedProduct?.mrp && (
                      <span className="product-details-mrp">
                        ₹{selectedProduct.mrp}
                      </span>
                    )}
                    <span className="product-details-price">
                      ₹{selectedProduct.price}
                    </span>
                    {selectedProduct?.category && (
                      <span className="product-details-category">
                        {selectedProduct.category}
                      </span>
                    )}
                  </div>
                  {selectedProduct?.shortDesc && (
                    <p className="product-details-shortdesc">
                      {selectedProduct.shortDesc}
                    </p>
                  )}
                  <button
                    className="product-details-add-btn"
                    onClick={handleAdd}
                    aria-label="Add to Cart"
                  >
                    <ion-icon name="cart-outline"></ion-icon> Add to Cart
                  </button>
                </div>
              </section>

              {/* Included Tests if it's a package */}
              {selectedProduct.includedTests?.length > 0 && (
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
                          setExpandedCategory(
                            expandedCategory !== category.categoryName
                              ? category.categoryName
                              : null
                          )
                        }
                        tabIndex={0}
                        role="button"
                        aria-label={`Toggle ${category.categoryName}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setExpandedCategory(
                              expandedCategory !== category.categoryName
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
                              if (match.toLowerCase() === "includes")
                                return "Includes";
                              if (match.toLowerCase() === "test") return "Test";
                              if (match.toLowerCase() === "tests")
                                return "Tests";
                              return match;
                            }
                          ) || category.categoryName}
                        </h4>
                        <ion-icon
                          name={
                            expandedCategory === category.categoryName
                              ? "chevron-up-outline"
                              : "chevron-down-outline"
                          }
                          className="category-toggle-icon"
                        ></ion-icon>
                      </div>
                      <Collapse in={expandedCategory === category.categoryName}>
                        <ul className="included-tests-list">
                          {(category.tests || []).map((testName, index) => (
                            <li key={index}>
                              {typeof testName === "string" &&
                              testName.length > 0
                                ? testName.charAt(0).toUpperCase() +
                                  testName.slice(1).toLowerCase()
                                : testName}
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                    </div>
                  ))}
                </section>
              )}

              <section className="product-details-tabs mt-4">
                <ul className="product-details-tablist">
                  <li
                    className={listSelected === "desc" ? "active" : ""}
                    style={{ cursor: "pointer" }}
                    onClick={() => setListSelected("desc")}
                  >
                    Description
                  </li>
                </ul>
                {listSelected === "desc" && (
                  <p className="product-details-desc mt-2">
                    {selectedProduct.description}
                  </p>
                )}
              </section>

              {precautionText && (
                <section className="precaution-section mt-4">
                  <div className="precaution-container">
                    <div className="precaution-icon">
                      <ion-icon name="warning-outline"></ion-icon>
                    </div>
                    <div className="precaution-content">
                      <h4 className="precaution-title">Precaution</h4>
                      <p className="precaution-text">{precautionText}</p>
                    </div>
                  </div>
                </section>
              )}

              <section className="why-book-with-us mt-4">
                <h3 className="why-book-title">Why book with us?</h3>
                <div className="why-book-features">
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
                      <ion-icon name="hourglass-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">Quick TAT Reports</span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="pricetag-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">
                      Best Prices Guaranteed
                    </span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="document-text-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">
                      Digital Report Delivery
                    </span>
                  </div>
                  <div className="why-book-feature">
                    <div className="why-book-icon">
                      <ion-icon name="card-outline"></ion-icon>
                    </div>
                    <span className="why-book-text">
                      Secure Online Payments
                    </span>
                  </div>
                </div>
              </section>

              <section className="how-it-works-section mt-4">
                <h3 className="how-it-works-title">How it works?</h3>
                <div className="how-it-works-cards">
                  <div className="how-it-works-card">
                    <div className="how-it-works-image">
                      <img
                        src={HeroImage}
                        alt="Lab technician"
                        className="how-it-works-img"
                      />
                    </div>
                    <p className="how-it-works-text">
                      Technician will be assigned for a free home sample
                      collection after booking confirmation.
                    </p>
                  </div>
                  <div className="how-it-works-card">
                    <div className="how-it-works-image">
                      <img
                        src={CollectionImage}
                        alt="Sample collection"
                        className="how-it-works-img"
                      />
                    </div>
                    <p className="how-it-works-text">
                      Sample will be collected by our technician at your address
                      at given slot.
                    </p>
                  </div>
                  <div className="how-it-works-card">
                    <div className="how-it-works-image">
                      <img
                        src={DigitalReportImage}
                        alt="Digital report"
                        className="how-it-works-img"
                      />
                    </div>
                    <p className="how-it-works-text">
                      Soft copy reports will be sent to your email address
                      within 24 to 48 hours of samples reaching the lab.
                    </p>
                  </div>
                </div>
              </section>

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
            </div>
          </Col>

          <Col md={4}>
            <div className="checkout-box form-container">
              <EmbeddedCheckoutForm
                CartItem={[selectedProduct]}
                setCartItem={setSelectedProduct}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProductDetails;
