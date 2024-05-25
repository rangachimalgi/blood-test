import { useContext, useState } from "react";
import "./healthProduct.css";
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../../App";
import { toast } from "react-toastify";

const HealthProduct = ({ title, productItem, addToCart, showImage = true }) => {
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

  const handleAdd = (productItem) => {
    addToCart(productItem);
    toast.success("Product has been added to cart!");
  };

  return (
    <div className="health-product-card">
      {title === "Big Discount" ? (
        <span className="health-discount">{productItem.discount}% Off</span>
      ) : null}
      {showImage && (
        <div className="health-product-image-container">
          <img
            loading="lazy"
            onClick={handleClick}
            src={productItem.imgUrl}
            alt=""
            className="health-product-image"
          />
        </div>
      )}
      <div className="health-product-details">
        <h3 onClick={handleClick}>{productItem.productName}</h3>
      </div>
    </div>
  );
};

export default HealthProduct;
