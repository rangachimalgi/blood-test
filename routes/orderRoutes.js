import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Order from '../models/Orders.js';
import { uploadReport, downloadReports, sendReportsByEmail } from '../controllers/orderController.js';
import generateInvoice from "../generateInvoice.js"// Ensure this matches the correct path

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", async (req, res) => {
  const orderDetails = req.body;

  const order = new Order(orderDetails);
  try {
    const savedOrder = await order.save();
    res.json({
      success: true,
      message: "Order processed successfully",
      order: savedOrder,
    });
    console.log("orders 22", order);
  } catch (error) {
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
    console.log("Orders Fetched:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error Fetching Orders:", error.message);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

router.post('/:orderId/generate-invoice', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send('Order not found');
    }

    const invoicePath = await generateInvoice(order);
    res.download(invoicePath, `invoice_${orderId}.pdf`, (err) => {
      if (err) {
        console.error('Error downloading invoice:', err);
        res.status(500).send('Internal Server Error');
      } else {
        fs.unlinkSync(invoicePath); // delete the file after sending
      }
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/:orderId/upload-report', upload.array('report'), uploadReport);
router.get("/:orderId/download-reports", downloadReports);
router.post("/:orderId/send-reports-by-email", sendReportsByEmail);

export default router;
