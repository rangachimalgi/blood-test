import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import multer from "multer";
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import "./keepAlive.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.memoryStorage(); // This stores the file in memory as buffer
const upload = multer({ storage: storage });

// Load environment variables from .env
dotenv.config();

//connect to database
connectDB();

const app = express();


// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

//use specific routes

// Define your routes
app.use("/api/auth", (req, res, next) => {
  console.log(`API Request Received: ${new Date().toISOString()} - Method: ${req.method} - Path: ${req.originalUrl}`);
  next();
}, authRoutes);
app.use("/api/orders", (req, res, next) => {
  console.log(`API Request Received: ${new Date().toISOString()} - Method: ${req.method} - Path: ${req.originalUrl}`);
  next();
}, orderRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get(/^\/(?!api|uploads).*/, function (req, res) {
  const index = path.join(__dirname, 'client', 'build', 'index.html');
  res.sendFile(index);
});
// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
