

// // not mine
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { v2 as cloudinary } from "cloudinary";

// // Multer → Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "ecommerce",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     public_id: (req, file) =>
//       `${Date.now()}-${file.originalname}`,
//   },
// });

// const upload = multer({ storage });

// export default upload;





import multer from "multer";

const storage = multer.memoryStorage(); // memoryStorage for serverless
const upload = multer({ storage });

export default upload;