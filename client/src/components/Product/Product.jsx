import { useContext, useState } from "react";
import { Col } from "react-bootstrap";
import "./product.css";
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../../App";
import { toast } from "react-toastify";

const Product = ({ title, productItem, addToCart, showImage = true, desc, enableHoverEffect, isShopList }) => {
  const { setSelectedProduct } = useContext(DataContainer);
  const router = useNavigate();
  const [count, setCount] = useState(0);

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
    addToCart(productItem);
    toast.success("Product has been added to cart!");
  };

  return (
    <Col
      lg={3}
      md={4}
      sm={6}
      xs={12}
      className={`product mtop ${enableHoverEffect ? 'hover-enabled' : ''}`}
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
      <div className="product-like">
        <label>{count}</label> <br />
        <ion-icon name="heart-outline" onClick={increment}></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={handleClick}>{productItem.productName}</h3>
        <div className="price">
          <h4>&#8377;{productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className={`add ${isShopList ? 'shop-list-add-button' : ''}`}
            onClick={handleAddToCart}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
        {isShopList && (
          <div className="shop-list-buttons">
            <button
              className="shop-list-book-button"
              onClick={handleClick}
            >
              Book Now
            </button>
            <button
              className="shop-list-add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </Col>
  );
};

export default Product;
