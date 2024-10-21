import { useContext, useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../../App";
import { toast } from "react-toastify";
import CheckoutForm from "../CheckoutForm";
import Highlight from "../../components/Highlight"; // Import Highlight component

const Product = ({ title, productItem, addToCart, showImage = true, desc, enableHoverEffect, isShopList }) => {
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
        router('/cart');
      }, 1000); // Delay to allow the toast message to be seen
    }
  };
  

  const handleBookNow = (pkg) => {
    setSelectedProduct(pkg);  // Assuming you still want to set the selected product in context or state
    router(`/shop/${pkg.id}`);  // Navigate to the product-specific page
};

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedPackage(null);
  };

  const extractNumberOfTests = (productName) => {
    const match = productName.match(/\((\d+)\s*Tests\)/i);
    return match ? match[1] : '';
  };

  const isPopularPackage = title === "Popular Packages";
  const isPopularTest = title === "Popular Tests";

  if (isShopList) {
    return (
      <Col
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="product-list-item"
      >
        <div className="product-info">
          <h3 onClick={handleClick} style={{ fontSize: '20px', fontWeight: '600' }}>{productItem.productName.toUpperCase()}</h3>
          <p>{productItem.labName || '\u00A0'}</p>
          </div>
        <div className="product-price">
          <h4>&#8377;{productItem.price}</h4>
          <div className="product-buttons">
            <button
              className="product-button book-now"
              onClick={handleClick}
            >
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
    return (
      <Col
        lg={3}
        md={4}
        sm={6}
        xs={12}
        className={`product mtop ${enableHoverEffect ? 'hover-enabled' : ''} ${isPopularPackage ? 'popular-packages' : ''}`}
      >
        {title === "Big Discount" && (
          <span className="discount">{productItem.discount}% Off</span>
        )}
        <div className="product-image-container">
          {showImage && (
            <img
              loading="lazy"
              onClick={handleClick}
              src={productItem.imgUrl}
              alt={productItem.productName}
              className="product-image"
            />
          )}
          {enableHoverEffect && (
            <div className="hover-overlay">
              <h2>{productItem.overlayTitle}</h2>
              <ul>
                {productItem.overlayDetails?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {desc && <p className="product-description">{desc}</p>}
        {isPopularPackage && (
          <Highlight number={extractNumberOfTests(productItem.productName)} />
        )}
        <div className="product-like">
          <label>{count}</label> <br />
          <ion-icon name="heart-outline" onClick={increment}></ion-icon>
        </div>
        <div className="product-details">
          <h3 onClick={handleClick}>{productItem.productName}</h3>
          <div className="price">
            <h4>&#8377;{productItem.price}</h4>
            {!isPopularPackage && (
              <button
                aria-label="Add"
                type="submit"
                className={`add ${isPopularTest ? 'add-to-cart-full' : ''}`}
                onClick={handleAddToCart}
              >
                {isPopularTest ? 'Add to Cart' : <ion-icon name="add"></ion-icon>}
              </button>
            )}
          </div>
          {isPopularPackage && (
            <>
              <div className="product-buttons">
                <button
                  className="product-button book-now"
                  onClick={() => handleBookNow(productItem)}
                >
                  Book Now
                </button>
              </div>
              <div className="extra-details">
                <ul>
                  <li><i className="fa fa-check-circle"></i> NABL, CAP, ISO 9001</li>
                  <li><i className="fa fa-check-circle"></i> Free Home Sample Pickup</li>
                  <li><i className="fa fa-check-circle"></i> Online Report Delivery</li>
                </ul>
              </div>
            </>
          )}
        </div>
        {showCheckout && (
          <CheckoutForm
            show={showCheckout}
            handleClose={handleCloseCheckout}
            CartItem={selectedPackage ? [selectedPackage] : []}
            setCartItem={() => {}}
          />
        )}
      </Col>
    );
  }
};

export default Product;
