import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
             type:Array,
        required:true
    },
    price:{
             type:String,
        required:true
    },
    offerPrice:{
             type:String,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
              type:String,
        required:true

    },
    inStock:{
        type:Boolean,
        default:true,
        required:true
    }
},{timestamps:true})

const Product=mongoose.model("Product",productSchema)
export default Product