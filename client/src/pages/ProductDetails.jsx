import { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { Col, Container, Row } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EmbeddedCheckoutForm from "../components/EmbeddedCheckoutForm.js";
import "../Styles/productDetails.css";

const ProductDetails = () => {
  const [listSelected, setListSelected] = useState("desc");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [includedTests, setIncludedTests] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { selectedProduct, setSelectedProduct, addToCart } =
    useContext(DataContainer);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!selectedProduct) {
      const storedProduct = localStorage.getItem(`selectedProduct-${id}`);
      setSelectedProduct(JSON.parse(storedProduct));
    }
  }, [id, selectedProduct, setSelectedProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (selectedProduct?.includedTests) {
      const allTests = selectedProduct.includedTests.flatMap(
        (category) => category.tests
      );
      setIncludedTests(
        products.filter((product) => allTests.includes(product.id))
      );
    }
    setRelatedProducts(
      products.filter(
        (item) =>
          item.category === selectedProduct?.category &&
          item.id !== selectedProduct?.id
      )
    );
  }, [selectedProduct]);

  useEffect(() => {
    return () => {
      setSelectedProduct(null);
    };
  }, [setSelectedProduct]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAdd = (selectedProduct, quantity) => {
    addToCart(selectedProduct, quantity);
    toast.success("Product has been added to cart!");
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
                  <h1>{selectedProduct?.products}</h1>
                  <Col md={6}>
                    <h2>{selectedProduct?.productName}</h2>
                    <div className="info">
                      <span className="price">&#8377;{selectedProduct?.price}</span>
                      <span>category: {selectedProduct?.category}</span>
                    </div>
                    <p>{selectedProduct?.shortDesc}</p>
                    {/* <input
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
                    </button> */}
                  </Col>
                </Row>
              </section>
              
              {/* Included Tests section */}
              {selectedProduct?.includedTests &&
                selectedProduct.includedTests.length > 0 && (
                  <section className="included-tests">
                    <h3>Included Tests</h3>
                    {selectedProduct.includedTests.map((category) => (
                      <div key={category.categoryName}>
                        <h4
                          onClick={() =>
                            setExpandedCategory(
                              expandedCategory === category.categoryName
                                ? null
                                : category.categoryName
                            )
                          }
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {expandedCategory === category.categoryName ? (
                            <i
                              className="fa fa-chevron-down"
                              style={{ marginRight: "10px" }}
                            ></i>
                          ) : (
                            <i
                              className="fa fa-chevron-right"
                              style={{ marginRight: "10px" }}
                            ></i>
                          )}
                          {category.categoryName}
                        </h4>

                        {expandedCategory === category.categoryName && (
                          <Row>
                            {category.tests.map((testId) => {
                              const test = products.find((p) => p.id === testId);
                              return (
                                <Col md={4} key={testId}>
                                  <div className="test-item">
                                    <h5>{test.productName}</h5>
                                    <p>{test.shortDesc}</p>
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                        )}
                      </div>
                    ))}
                  </section>
                )}

              <section className="product-reviews">
                <ul>
                  <li
                    style={{
                      color: listSelected === "desc" ? "black" : "#9c9b9b",
                    }}
                    onClick={() => setListSelected("desc")}
                  >
                    Description
                  </li>
                </ul>
                {listSelected === "desc" ? (
                  <p>{selectedProduct?.description}</p>
                ) : (
                  <div className="rates">
                    {selectedProduct?.reviews.map((rate) => (
                      <div className="rate-comment" key={rate.rating}>
                        <span>Jhon Doe</span>
                        <span>{rate.rating} (rating)</span>
                        <p>{rate.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* <section className="related-products">
                <h3>You might also like</h3>
                <ShopList productItems={relatedProducts} addToCart={addToCart} />
              </section> */}
            </div>
          </Col>
          <Col md={4}>
            <div className="checkout-box form-container">
              <EmbeddedCheckoutForm
                CartItem={selectedProduct ? [selectedProduct] : []}
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
