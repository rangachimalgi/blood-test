import { Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./Product/Product";
import { DataContainer } from "../App";
import "../Styles/Shop.css";

const ShopList = ({ productItems }) => {
  const { addToCart } = useContext(DataContainer);
  const navigate = useNavigate();

  useEffect(() => {}, [productItems]);

  const handleAddToCart = (product) => {
    addToCart(product);
    const toastId = toast.success("Product has been added to cart!", { autoClose: 1000 });

    setTimeout(() => {
      toast.update(toastId, {
        render: (
          <>
            <div>Product has been added to cart!</div>
            <button
              onClick={() => {
                navigate("/cart");
                toast.dismiss(toastId);
              }}
              style={{
                color: "#007bff",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Go to Cart
            </button>
          </>
        ),
        autoClose: false,
        closeButton: true,
      });
    }, 1000);
  };

  if (productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  } else {
    return (
      <div>
        <ToastContainer />
        <Row className="justify-content-center shop-list-grid">
          {productItems.map((productItem, idx) => (
            <div className="shop-list-simple-row" key={productItem.id} style={{ animationDelay: `${(idx % 6) * 0.12}s` }}>
              <div
                className="shop-list-simple-name"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${productItem.productName}`}
                onClick={() => navigate(`/shop/${productItem.id}`)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/shop/${productItem.id}`);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                {productItem.productName}
              </div>
              <div className="shop-list-simple-price">₹{productItem.price}</div>
              <div className="shop-list-simple-buttons">
                <button
                  className="shop-list-book-button"
                  aria-label="Book Now"
                  onClick={() => navigate(`/shop/${productItem.id}`)}
                >
                  Book Now
                </button>
                <button
                  className="shop-list-add-to-cart-button"
                  aria-label="Add to Cart"
                  onClick={() => handleAddToCart(productItem)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Row>
      </div>
    );
  }
};

export default ShopList;
