import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";

import userRoutes from './routes/user.routes.js'
import sellerRoutes from './routes/seller.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import addressRoutes from './routes/address.routes.js'

const app = express()

app.set("trust proxy", 1);

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// routes
app.use('/api/user', userRoutes)
app.use('/api/seller', sellerRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/address', addressRoutes)

// DB connect
async function connectDb() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on port ${PORT}`);
});