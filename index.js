// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
// import cors from 'cors'
// import cookieParser  from 'cookie-parser'
// import mongoose from "mongoose";
// import serverless from 'serverless-http';
// // import { connectDB } from './config/connectDB.js'             //.js is imp because we are using import 
// import userRoutes from './routes/user.routes.js'   //name can be anything here like. userRoutes
// import sellerRoutes from './routes/seller.routes.js'
// import productRoutes from './routes/product.routes.js'
// import cartRoutes from './routes/cart.routes.js'
// import orderRoutes from './routes/order.routes.js'
// import addressRoutes from './routes/address.routes.js'
// import { connectCloudinary } from './config/cloudinary.js'


// //new
// app.set("trust proxy", 1);
// const PORT = process.env.PORT || 10000;


// const app=express()

// //  connectDB();

//  let isConnected=false
// async function connectDb() {
//      if (isConnected) return;
//     try{
//         await mongoose.connect(process.env.MONGO_URL ,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true
//         })
//         isConnected=true;
//         console.log("Connected to mongodb");
        
//     }
//     catch(error){
//         console.error("Error connected to mongo db", error);
        
//     }
// }

// app.use(async (req, res, next) => {
//   if (!isConnected) await connectDb();
//   next();
// });


// //  await connectCloudinary();
// // app.use(async (req, res, next) => {
// //    await connectCloudinary();
// //   next();
// // });


// const allowedOrigins=[
//         "http://localhost:5178", // ✅ ADD THIS
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:5175",
//       "http://localhost:5176",
//       process.env.CLIENT_URL,
// ]

// //middlewares
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser())

// app.use(cors({origin: allowedOrigins , credentials:true}));


// //api end points
// // app.use('/images', express.static("uploads"))  //uploads folder will create now here save images
// app.use('/api/user' , userRoutes)
// app.use('/api/seller',sellerRoutes)
// app.use('/api/product',productRoutes)
// app.use('/api/cart',cartRoutes)
// app.use('/api/order',orderRoutes)
// app.use('/api/address',addressRoutes)






// export default app


// ============================================new code with serverless
// backend/app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import addressRouter from "./routes/address.routes.js";

const app = express();

// Trust proxy (for cookies in serverless)
app.set("trust proxy", 1);

let isConnected = false;
async function connectDb() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  if (!isConnected) await connectDb();
  next();
});

// CORS & JSON middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL], // Vercel frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);

// Optional root route
app.get("/", (req, res) => {
  res.send("Grocery backend is live!");
});

// Export for serverless deployment
export default app;
