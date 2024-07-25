import React, { useContext } from "react";
import { DataContainer } from "../App";
import { Button, Card } from "react-bootstrap";
import "../Styles/cartSummary.css"; 

const CartSummary = ({ onBookNow }) => {
  const { CartItem, deleteProduct } = useContext(DataContainer);

  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  return (
    <Card className="cart-summary">
      <Card.Body>
        <Card.Title>Cart Summary</Card.Title>
        {CartItem.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <ul>
            {CartItem.map((item) => (
              <li key={item.id}>
                {item.productName} x {item.qty} = &#8377;{item.price * item.qty}
                <Button 
                  variant="danger" 
                  onClick={() => deleteProduct(item)}
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <h4>Total Price: &#8377;{totalPrice}</h4>
        <Button
          variant="primary"
          onClick={onBookNow}
        >
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
