import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDB.js'             //.js is imp because we are using import 
import userRoutes from './routes/user.routes.js'   //name can be anything here like. userRoutes
import sellerRoutes from './routes/seller.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import addressRoutes from './routes/address.routes.js'
import { connectCloudinary } from './config/cloudinary.js'


dotenv.config()
const app=express()

// await connectDB();



connectDB()
  .then(() => console.log("✅ DB connected"))
  .catch(err => {
    console.error("❌ DB failed:", err.message);
    process.exit(1);
  });

connectCloudinary()


const allowedOrigins=['http://localhost:5173','http://localhost:5174',
    process.env.CLIENT_URL
]

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(cors({origin: allowedOrigins , credentials:true}));

// app.use(cors({
//   origin: true,
//   credentials: true
// }))


//api end points
// app.use('/images', express.static("uploads"))  //uploads folder will create now here save images
app.use('/api/user' , userRoutes)
app.use('/api/seller',sellerRoutes)
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/address',addressRoutes)

app.get('/', (req, resp) => {
  try {
    resp.send("yes it is working");
  } catch (err) {
    console.error("GET / error:", err);
    resp.status(500).send("Server Error");
  }
});




export default app