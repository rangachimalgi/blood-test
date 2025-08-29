import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useContext, useEffect, useState, useRef } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import CartSummary from "../components/CartSummary";
import CheckoutForm from "../components/CheckoutForm";
import "../Styles/Shop.css";

const Shop = () => {
  const { addToCart, cachedTests, testsLoading, fetchTests } = useContext(DataContainer);
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const cartSummaryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      // Use cached data or fetch if not available
      if (cachedTests.length > 0) {
        setAllProducts(cachedTests);
        setFilterList(cachedTests);
        setLoading(false);
      } else {
        setLoading(true);
        const data = await fetchTests();
        setAllProducts(data);
        setFilterList(data);
        setLoading(false);
      }
    };

    loadProducts();
    window.scrollTo(0, 0);
  }, [cachedTests, fetchTests]);

  const handleBookNow = () => navigate("/cart");

  const handleCloseCheckout = () => setShowCheckout(false);

  const scrollToCartSummary = () => {
    if (cartSummaryRef.current) {
      cartSummaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <Fragment>
        <section className="filter-bar">
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={{ marginTop: '1rem' }}>Loading tests...</p>
          </div>
        </section>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center">
            <Col md={12}>
              {/* Pass both list and setter */}
              <SearchBar
                allProducts={allProducts}
                setFilterList={setFilterList}
              />
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col md={8}>
              <ShopList productItems={filterList} addToCart={addToCart} />
            </Col>
            <Col md={4} ref={cartSummaryRef}>
              <CartSummary onBookNow={handleBookNow} />
            </Col>
          </Row>
        </Container>

        <button
          onClick={scrollToCartSummary}
          className="fixed-view-cart-button"
        >
          View Cart
        </button>
      </section>

      {showCheckout && (
        <CheckoutForm
          show={showCheckout}
          handleClose={handleCloseCheckout}
          CartItem={filterList}
          setCartItem={() => {}}
        />
      )}
    </Fragment>
  );
};

export default Shop;
