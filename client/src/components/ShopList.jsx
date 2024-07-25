import { Row, Pagination } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./Product/Product";
import { DataContainer } from "../App";

const ShopList = ({ productItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; // Change as needed
  const totalPages = Math.ceil(productItems.length / itemsPerPage);
  const displayedProducts = productItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
          {displayedProducts.map((productItem) => {
            return (
              <Product
                key={productItem.id}
                title={null}
                productItem={productItem}
                addToCart={addToCart}
                handleAddToCart={handleAddToCart}
                showImage={false}
              />
            );
          })}
        </Row>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx}
                active={idx + 1 === currentPage}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((old) => Math.min(old + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      </div>
    );
  }
};

export default ShopList;
