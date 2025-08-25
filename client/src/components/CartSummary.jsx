import React, { useContext } from "react";
import { DataContainer } from "../App";
import { Button } from "react-bootstrap";
import "../Styles/cartSummary.css"; 

const CartSummary = ({ onBookNow }) => {
  const { CartItem, deleteProduct, addToCart, setCartItem } = useContext(DataContainer);

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const decreaseQty = (product) => {
    const updatedCart = CartItem.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty - 1 } : item
    ).filter((item) => item.qty > 0);

    setCartItem(updatedCart);
    setTimeout(() => {
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
    }, 0);
  };

  const clearAllItems = () => {
    setCartItem([]);
    localStorage.setItem("cartItem", JSON.stringify([]));
  };

  return (
    <div className="cart-summary-container">
      <div className="cart-summary-header">
        <h4 className="cart-summary-title">Order Summary</h4>
        {CartItem.length > 0 && (
          <button 
            className="clear-all-button"
            onClick={clearAllItems}
            title="Clear all items"
          >
            🗑️
          </button>
        )}
      </div>
      
      {CartItem.length === 0 ? (
        <div className="empty-cart-message">
          <h5>Your cart is empty</h5>
          <p>Add some tests to get started</p>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-item-card" key={item.id}>
                  <div className="cart-item-details">
                    <h6 className="cart-item-name">{item.productName}</h6>
                    <p className="cart-item-price">
                      ₹{item.price} x {item.qty} = ₹{productQty}
                    </p>
                    <div className="cart-item-actions">
                      <Button
                        size="sm"
                        variant="outline-success"
                        className="action-button"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-warning"
                        className="action-button"
                        onClick={() => decreaseQty(item)}
                      >
                        –
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="action-button"
                        onClick={() => deleteProduct(item)}
                      >
                        🗑
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary-footer">
            <div className="total-price">
              <span>Total Amount:</span>
              <span className="price">₹{totalPrice}</span>
            </div>
            <Button
              onClick={onBookNow}
              className="add-more-button"
            >
              Book Now
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
