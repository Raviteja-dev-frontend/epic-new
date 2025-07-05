import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import manageRoute from './routes/manageRoute.js';
import catagereRouter from './routes/catagereRoute.js';
import slideRouter from './routes/slideRoute.js';
import enquiryRoute from './routes/enquiryRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// ✅ Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', manageRoute);
app.use('/api/catagere', catagereRouter);
app.use('/api/slides', slideRouter);
app.use('/api/enquiries', enquiryRoute);

// Root route
app.get('/', (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => console.log(`🚀 Server started on PORT: ${port}`));
