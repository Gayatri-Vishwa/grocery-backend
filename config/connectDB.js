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

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL || "" );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}
// export default connectDB;