import express from 'express';
import Order from '../models/Orders.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const { 
    pincode, 
    name, 
    email, 
    address, 
    phoneno, 
    age, 
    noOfPersons, 
    appointmentDate, 
    tests,
    beneficiaries, 
    cartItems 
  } = req.body;

  console.log("Received Order Data: ", req.body); // Log received data

  const order = new Order({
    pincode,
    name,
    email,
    address,
    phoneno,
    age,
    noOfPersons,
    appointmentDate,
    tests,
    beneficiaries,
    cartItems
  });

  try {
    const savedOrder = await order.save();
    res.json({
      success: true,
      message: "Order processed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error Saving Order: ", error); // Log error
    res.status(500).json({
      success: false,
      message: "Error processing order",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("API Route Hit: GET /api/orders");
    const orders = await Order.find(); // Fetch all orders from the database
    console.log("Orders Fetched:", orders); // Console log the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error Fetching Orders:", error.message);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
