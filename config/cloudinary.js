// import {v2 as cloudinary} from 'cloudinary'
// export const connectCloudinary=async()=>{
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     })
// }

import { v2 as cloudinary } from "cloudinary";

let isCloudinaryConnected = false;

export const connectCloudinary = async () => {
  if (isCloudinaryConnected) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  isCloudinaryConnected = true;
  console.log("✅ Cloudinary connected (serverless)");
};

