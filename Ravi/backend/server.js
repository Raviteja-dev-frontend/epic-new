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
import enquiryRoute from "./routes/enquiryRoute.js";
import keywordRouter from './routes/keywordRoute.js';

// ✅ Security Packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Middleware Security Setup
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Body Parser
app.use(express.json());

// Redirect HTTP to HTTPS (optional for production)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });
}

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', manageRoute);
app.use('/api/catagere', catagereRouter);
app.use('/api/slides', slideRouter);
app.use('/api/enquiries', enquiryRoute);
app.use('/api/keyword', keywordRouter);

// Health Check
app.get('/', (req, res) => {
  res.send('API Working Securely ✅');
});

app.listen(port, () => console.log('Server started on PORT: ' + port));
