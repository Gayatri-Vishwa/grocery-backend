import Product from "../models/product.model.js";



//    /api/product/add-product
// export const addProduct = async (req, resp) => {
//   try {
    
//      console.log("BODY:", req.body); 
//     const { name, description, price, offerPrice, category} = req.body;
//     const image = req.files?.map((file) => file.path); // Cloudinary URLs

//     // const image = req.files?.map((file)=>file.filename);
//      if (
//       !name ||
//       !price ||
//       !offerPrice ||
//       !description ||
//       !category ||
//       !image ||
//       image.length === 0
//     ) {
//       return resp.status(400).json({
//         success: false,
//         message: "All fields including images are required",
//       });
//     }
//     const newProduct =await Product.create({
//       name,
//       description,
//       price,
//       offerPrice,
//       category,
//       image,
//     });
//     resp.status(201).json({message:"Product Added successfully" , success:true ,product:newProduct})
//   } catch (error) {
//     resp.status(500).json({ message: " Server error", error: error.message });
//   }
// };
import Product from "../models/product.model.js";
import { connectCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

// Add Product
export const addProduct = async (req, res) => {
  try {
    await connectCloudinary();

    const { name, description, price, offerPrice, category } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least one image" });
    }

    // Upload each file to Cloudinary
    const imageUrls = [];
    for (let file of files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
      imageUrls.push(result.secure_url);
    }

    // Validate other fields
    if (!name || !price || !offerPrice || !description || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      offerPrice,
      category,
      image: imageUrls,
    });

    res.status(201).json({ message: "Product added successfully ✅", success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Product Images Only
export const updateProductImage = async (req, res) => {
  try {
    await connectCloudinary();

    const { id } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least one image" });
    }

    const newImages = [];
    for (let file of files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
      newImages.push(result.secure_url);
    }

    const product = await Product.findByIdAndUpdate(id, { image: newImages }, { new: true });

    res.status(200).json({ success: true, message: "Images updated successfully ✅", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

//get all products : /api/product/get
export const getProducts = async (req, resp) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    resp.status(200).json({ products, success: true });
  } catch (error) {
    resp.status(500).json({ message: " Server error", error: error.message });
  }
};


//get single product by id  :  /api/product/id

export const getProductById=async(req,resp)=>{
    try {
       const { id } = req.params;
        // const {id}=req.body
       

        const product=await Product.findById(id)
        if(!product){
            return resp.status(400).json({ message: " product not found", success:false });
        }
        return resp.status(200).json({ product, success:true });
    } catch (error) {
          resp.status(500).json({ message: " Server error", error: error.message });
    }
}

//change stock         /api/product/stock
export const changeStock=async(req,resp)=>{
    try {
        const {id, inStock}=req.body
        const product=await Product.findByIdAndUpdate(id,{inStock}, {new:true})
            return resp.status(200).json({ product, massage:"stock updated successfully", success:true });
    } catch (error) {
           resp.status(500).json({ message: " Server error", error: error.message });
    }
}


//update img only 
// export const updateProductImage = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload at least one image",
//       });
//     }

//     const newImages = req.files.map(file => file.path);

//     const product = await Product.findByIdAndUpdate(
//       id,
//       { image: newImages },   // 🔥 ONLY image updated
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Images updated successfully ✅",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

















