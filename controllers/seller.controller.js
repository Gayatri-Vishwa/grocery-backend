import jwt from "jsonwebtoken";

export const sellerLogin = async (req, resp) => {
  try {
    // const { email, password } = req.cookies;
    const { email, password } = req.body;
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      resp.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", //use secure cookies in  production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // helps prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      resp.status(200).json({message:"Login successfully" ,success:true})
    }
  } catch (error) {
    console.log("Internal server error", error);
    resp.status(500).json({ message: "internal server error", success: false });
  }
};



//logout seller

export const  sellerLogout=async(req,resp)=>{
    try {
          resp.clearCookie("sellerToken", {
      //only have to clear cookie by cookie name  and these
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //use secure cookies in  production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // helps prevent CSRF attacks
    });
    resp
      .status(200)
      .json({ message: "User loggedOut successfully", success: true });
        
    } catch (error) {
          console.log("Internal server error", error);
    resp.status(500).json({ message: "internal server error", success: false });
    }
}



//check auth seller : /api/seller/is-auth
export const isAuthSeller = async (req, resp) => {
  try {

    resp.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return resp
      .status(500)
      .json({ message: "internal server error", success: false });
  }
};