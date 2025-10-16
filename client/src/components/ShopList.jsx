import { Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../App";
import "../Styles/Shop.css";

const ShopList = ({ productItems }) => {
  const { addToCart } = useContext(DataContainer);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ShopList: productItems updated:', productItems?.length || 0, 'items');
  }, [productItems]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!productItems || productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }

  return (
    <div>
      {/* Show total count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">
          Showing all {productItems.length} tests
        </p>
      </div>

      <Row className="justify-content-center shop-list-grid">
        {productItems.map((productItem, idx) => {
          // Validate productItem
          if (!productItem || !productItem.productName) {
            console.warn(`Invalid product item at index ${idx}:`, productItem);
            return null;
          }

          // Create a more stable key
          const stableKey = productItem.id ? `test-${productItem.id}` : `shop-item-${idx}-${productItem.productName?.replace(/\s+/g, '-')}`;
          
          return (
            <div 
              className="shop-list-simple-row" 
              key={stableKey} 
              style={{ animationDelay: `${(idx % 6) * 0.12}s` }}
            >
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
          );
        })}
      </Row>
    </div>
  );
};

export default ShopList;
