import { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmbeddedCheckoutForm from "../components/EmbeddedCheckoutForm.js";
import "../Styles/productDetails.css";

const ProductDetails = () => {
  const { addToCart } = useContext(DataContainer);
  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [listSelected, setListSelected] = useState("desc");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${id}`);
        const data = await res.json();
        setSelectedProduct(data);
      } catch (err) {
        console.error("Failed to fetch product by ID:", err);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAdd = () => {
    addToCart(selectedProduct);
    // Removed toast notification
  };

  const handleLike = () => {
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  if (!selectedProduct) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <Fragment>
      <Banner title={selectedProduct.productName} />
      <Container className="product-page">
        <Row>
          <Col md={8}>
            <div className="product-details-modern-card">
              <section>
                <Row className="align-items-center justify-content-center">
                  <Col md={6} className="product-details-img-col">
                    <div className="product-details-img-wrapper">
                      <img
                        loading="lazy"
                        src={selectedProduct.imgUrl}
                        alt={selectedProduct.productName}
                        className="product-details-img"
                      />
                      <button
                        className={`product-details-like-btn${liked ? ' liked' : ''}`}
                        aria-label={liked ? 'Unlike' : 'Like'}
                        onClick={handleLike}
                        type="button"
                      >
                        <ion-icon name={liked ? 'heart' : 'heart-outline'}></ion-icon>
                        <span className="like-count">{likeCount}</span>
                      </button>
                    </div>
                  </Col>
                  <Col md={6} className="product-details-info-col">
                    <h2 className="product-details-title">{selectedProduct.productName}</h2>
                    <div className="product-details-meta">
                      <span className="product-details-price">₹{selectedProduct.price}</span>
                      <span className="product-details-category">{selectedProduct.category}</span>
                    </div>
                    <p className="product-details-shortdesc">{selectedProduct.shortDesc}</p>
                    <button className="product-details-add-btn" onClick={handleAdd} aria-label="Add to Cart">
                      <ion-icon name="cart-outline"></ion-icon> Add to Cart
                    </button>
                  </Col>
                </Row>
              </section>

              {/* Included Tests if it's a package */}
              {selectedProduct.includedTests?.length > 0 && (
                <section className="included-tests-modern mt-4">
                  <h3>Included Tests</h3>
                  {selectedProduct.includedTests.map((category, i) => (
                    <div key={i} className="included-tests-category">
                      <h4
                        className="included-tests-category-title"
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category.categoryName ? null : category.categoryName
                          )
                        }
                        tabIndex={0}
                        role="button"
                        aria-label={`Toggle ${category.categoryName}`}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setExpandedCategory(
                              expandedCategory === category.categoryName ? null : category.categoryName
                            );
                          }
                        }}
                      >
                        <ion-icon name={expandedCategory === category.categoryName ? 'chevron-down-outline' : 'chevron-forward-outline'}></ion-icon>
                        {category.categoryName}
                      </h4>
                      {expandedCategory === category.categoryName && (
                        <ul className="included-tests-list">
                          {category.tests.map((test, index) => (
                            <li key={index}>{test}</li>
                          ))}
                        </ul>
                      )}
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
                  <p className="product-details-desc mt-2">{selectedProduct.description}</p>
                )}
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
