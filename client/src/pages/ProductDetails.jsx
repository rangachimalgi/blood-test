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
    toast.success("Product has been added to cart!");
  };

  if (!selectedProduct) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <Fragment>
      <Banner title={selectedProduct.productName} />
      <Container className="product-page">
        <Row>
          <Col md={8}>
            <div className="product-box">
              <section>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <img
                      loading="lazy"
                      src={selectedProduct.imgUrl}
                      alt={selectedProduct.productName}
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={6}>
                    <h2>{selectedProduct.productName}</h2>
                    <div className="info">
                      <span className="price">₹{selectedProduct.price}</span>
                      <span>Category: {selectedProduct.category}</span>
                    </div>
                    <p>{selectedProduct.shortDesc}</p>
                    <button className="btn btn-primary mt-3" onClick={handleAdd}>
                      Add to Cart
                    </button>
                  </Col>
                </Row>
              </section>

              {/* Included Tests if it's a package */}
              {selectedProduct.includedTests?.length > 0 && (
                <section className="included-tests mt-4">
                  <h3>Included Tests</h3>
                  {selectedProduct.includedTests.map((category, i) => (
                    <div key={i}>
                      <h4
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category.categoryName ? null : category.categoryName
                          )
                        }
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {expandedCategory === category.categoryName ? (
                          <i className="fa fa-chevron-down me-2"></i>
                        ) : (
                          <i className="fa fa-chevron-right me-2"></i>
                        )}
                        {category.categoryName}
                      </h4>
                      {expandedCategory === category.categoryName && (
                        <ul className="ms-4">
                          {category.tests.map((test, index) => (
                            <li key={index}>{test}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}

              <section className="product-reviews mt-4">
                <ul>
                  <li
                    style={{
                      color: listSelected === "desc" ? "black" : "#9c9b9b",
                      cursor: "pointer",
                    }}
                    onClick={() => setListSelected("desc")}
                  >
                    Description
                  </li>
                </ul>
                {listSelected === "desc" && (
                  <p className="mt-2">{selectedProduct.description}</p>
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
