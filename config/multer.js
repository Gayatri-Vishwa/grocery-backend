

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


// Multer CloudinaryStorage setup
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

export const upload = multer({ storage });
