// import mongoose from "mongoose";

// export const connectDB=async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("mongodb connected");
        
        
//     } catch (error) {
//         console.log("Error connecting to MongoDB:" ,error);
//         process.exit(1)
        
//     }
// }


import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => {
      console.log("MongoDB connected ✅");
      return mongooseInstance;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err; // let the function fail gracefully
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
