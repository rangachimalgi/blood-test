import React from "react";
import "./healthProduct.css";

const HealthProduct = ({
  title,
  productItem,
  addToCart,
  showImage = true,
  onClick,
}) => {
  const name = productItem.name || productItem.productName;
  const imageUrl = productItem.imgUrl;

  return (
    <div className="health-product-card" onClick={onClick}>
      {title === "Big Discount" && (
        <span className="health-discount">{productItem.discount}% Off</span>
      )}
      {showImage && (
        <div className="health-product-image-container">
          <img
            loading="lazy"
            src={imageUrl}
            alt={name}
            className="health-product-image"
          />
        </div>
      )}
      <div className="health-product-details">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default HealthProduct;
