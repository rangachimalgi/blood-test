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
        <Row className="justify-content-center">
          {productItems.map((productItem) => {
            return (
              <Product
                key={productItem.id}
                title={null}
                productItem={productItem}
                addToCart={addToCart}
                handleAddToCart={handleAddToCart}
                showImage={false}
                isShopList={true} // Pass the prop to indicate this is a ShopList
              />
            );
          })}
        </Row>
      </div>
    );
  }
};

export default ShopList;
