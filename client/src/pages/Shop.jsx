import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useContext, useEffect, useState, useRef } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import { DataContainer } from "../App";
import { useParams } from "react-router-dom";
import CartSummary from "../components/CartSummary";
import CheckoutForm from "../components/CheckoutForm";
import "../Styles/Shop.css";  // Import your CSS file here

const Shop = () => {
  const { addToCart, globalFilterList } = useContext(DataContainer);
  const { id } = useParams();
  const [filterList, setFilterList] = useState(globalFilterList);
  const [showCheckout, setShowCheckout] = useState(false);
  const cartSummaryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFilterList(globalFilterList); // Whenever global filter list changes, update local list
  }, [globalFilterList]);

  const handleBookNow = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const scrollToCartSummary = () => {
    if (cartSummaryRef.current) {
      cartSummaryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Fragment>
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center">
            <Col md={12}>
              <SearchBar setFilterList={setFilterList} />
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
          CartItem={filterList}  // This might need to be the selected items in the cart instead
          setCartItem={() => {}}
        />
      )}
    </Fragment>
  );
};

export default Shop;
