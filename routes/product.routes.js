import express from "express";
import { authSeller } from "../middleware/authSeller.js";
import upload from "../config/multer.js";
import {
  addProduct,
  changeStock,
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";

const router = express.Router();

// //router.post('/add-product', authSeller,upload.array("image")  , addProduct)
// router.post("/add-product", upload.array("image"), authSeller, addProduct);

// Add Product (4 images max)
router.post("/add-product", upload.array("image", 4),authSeller, addProduct);

// Update Product Images
router.put("/update-image/:id", upload.array("image", 4), updateProductImage);


router.get("/list", getProducts);
router.get("/:id", getProductById);
// router.get('/id', getProductById)
router.post("/stock", authSeller, changeStock);
export default router;

// router.put("/update-image/:id",authSeller, upload.array("image", 5), updateProductImage);
// router.patch("/update-images/:id", upload.array("images"), updateProductImage);
