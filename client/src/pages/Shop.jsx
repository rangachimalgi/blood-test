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
  const { addToCart } = useContext(DataContainer);
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const cartSummaryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/tests`
        );
        setAllProducts(res.data);
        setFilterList(res.data); // show all initially
      } catch (err) {
        console.error("Failed to fetch tests", err);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleBookNow = () => navigate("/cart");

  const handleCloseCheckout = () => setShowCheckout(false);

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
