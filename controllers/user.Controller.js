import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user : /api /user/register
export const registerUser = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return resp
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return resp
        .status(400)
        .json({ message: "User Already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword }); //create user if not exisiisting and all  fields are filled

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); //create token
    resp.cookie("token", token, {
      //store token in cookie
      httpOnly: true,
      secure:true, //use secure cookies in  production
      sameSite:  "none" , // helps prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days age in millisec
    });
    resp.json({
      message: "User registered successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error" });
  }
};

//login api
export const loginUser = async (req, resp) => {
  try {
      console.log("login ");
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password); //match password
    if (!isMatch) {
      return resp
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //create token
      expiresIn: "7d",
    });
    resp.cookie("token", token, {
      //store token in cookie
      httpOnly: true,
      secure: true, //use secure cookies in  production
      sameSite:  "none" , // helps prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days age in millisec
    });
    resp.json({
      message: "user loggedIn successfully",
      success: true,
      // user: {
      //   name: user.name,
      //   email: user.email,
      // },
      user: {
  _id: user._id,
  name: user.name,
  email: user.email,
}

    }

  
  );
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "internal server Error" });
  }
};

//logout
export const logeOutUser = async (req, resp) => {
  try {
    resp.clearCookie("token", {
      //only have to clear cookie by cookie name  and these
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //use secure cookies in  production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // helps prevent CSRF attacks
    });
    resp
      .status(200)
      .json({ message: "User loggedOut successfully", success: true });
  } catch (error) {
    console.log(error,"nhi hua ");
    return resp
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};






//check auth user : /api/user/is-auth
export const isAuthUser = async (req, resp) => {
  try {
    const userId = req.user; // it is decoded id asigned in authUser.js file
    if (!userId) {
      return resp.status(401).json({ message: "UnAuthorized", success: false });
    }
    const user = await User.findById(userId).select("-password");
    resp.json({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    return resp
      .status(401)
      .json({ message: "internal server error", success: false });
  }
};
