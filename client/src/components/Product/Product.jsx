import { useContext, useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../../App";
import { toast } from "react-toastify";
import CheckoutForm from "../CheckoutForm";
import Highlight from "../../components/Highlight"; // Import Highlight component

const Product = ({
  title,
  productItem,
  addToCart,
  showImage = true,
  desc,
  enableHoverEffect,
  isShopList,
}) => {
  const { setSelectedProduct } = useContext(DataContainer);
  const router = useNavigate();
  const [count, setCount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const handleClick = () => {
    setSelectedProduct(productItem);
    localStorage.setItem(
      `selectedProduct-${productItem.id}`,
      JSON.stringify(productItem)
    );
    router(`/shop/${productItem.id}`);
  };
  const handleAddToCart = () => {
    addToCart(productItem); // Only call the addToCart function passed from the parent
    if (isMobile && title === "Popular Tests") {
      setTimeout(() => {
        router("/cart");
      }, 1000); // Delay to allow the toast message to be seen
    }
  };

  const handleBookNow = (pkg) => {
    setSelectedProduct(pkg); // Assuming you still want to set the selected product in context or state
    router(`/shop/${pkg.id}`); // Navigate to the product-specific page
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  const extractNumberOfTests = (productName) => {
    const match = productName.match(/\((\d+)\s*Tests\)/i);
    return match ? match[1] : "";
  };

  const isPopularPackage = title === "Popular Packages";
  const isPopularTest = title === "Popular Tests";

  if (isShopList) {
    return (
      <Col lg={12} md={12} sm={12} xs={12} className="product-list-item">
        <div className="product-info">
          <h3
            onClick={handleClick}
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            {productItem.productName.toUpperCase()}
          </h3>
          <p>{productItem.labName || "\u00A0"}</p>
        </div>
        <div className="product-price">
          <h4>&#8377;{productItem.price}</h4>
          <div className="product-buttons">
            <button className="product-button book-now" onClick={handleClick}>
              Book Now
            </button>
            <button
              className="product-button add-to-cart"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </Col>
    );
  } else {
    // Staggered animation for fade-in
    const animationDelay = isPopularTest ? `${productItem.id % 4 * 0.15}s` : '0s';
    return (
      <Col lg={3} md={4} sm={6} xs={12} className="product-col">
        <div
          className={`product mtop ${
            enableHoverEffect ? "hover-enabled" : ""
          } ${isPopularPackage ? "popular-packages" : ""} ${isPopularTest ? "popular-test-card" : ""}`}
          style={isPopularTest ? { animationDelay } : {}}
        >
          {/* Glassy floating badge for number of tests */}
          {isPopularTest && (
            <div className="popular-tests-badge" aria-label={`${extractNumberOfTests(productItem.productName)} tests`}>
              <Highlight number={extractNumberOfTests(productItem.productName)} />
            </div>
          )}
          <div className="product-image-container">
            {showImage && (
              <img
                loading="lazy"
                onClick={handleClick}
                src={productItem.imgUrl || "/Images/GenaralHealthPackage.jpg"}
                alt={productItem.productName}
                className="product-image"
                aria-label={productItem.productName}
                onError={(e) => {
                  console.log('Image failed to load, using fallback:', productItem.productName);
                  e.target.src = "/Images/GenaralHealthPackage.jpg";
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', productItem.productName);
                }}
              />
            )}
          </div>
          {/* Like button */}
          {isPopularTest && (
            <button
              className="product-like-btn"
              aria-label="Like this test"
              onClick={increment}
              type="button"
            >
              <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
              <span className="like-count">{count}</span>
            </button>
          )}
          <div className="product-details">
            <h3 
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${productItem.productName}`}
            >
              {productItem.productName}
            </h3>
            {desc && <p className="product-description">{desc}</p>}
            <div className="price-row">
              <span className="product-price">₹{productItem.price}</span>
              {isPopularTest && (
                <button
                  aria-label={`Add ${productItem.productName} to cart`}
                  type="button"
                  className="add add-to-cart-modern"
                  onClick={handleAddToCart}
                >
                  <ion-icon name="cart-outline" aria-hidden="true"></ion-icon>
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
          {showCheckout && (
            <CheckoutForm
              show={showCheckout}
              handleClose={handleCloseCheckout}
              CartItem={selectedPackage ? [selectedPackage] : []}
              setCartItem={() => {}}
            />
          )}
        </div>
      </Col>
    );
  }
};

export default Product;
