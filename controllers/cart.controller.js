import User from "../models/user.model.js";

//update user cart data :   /api/cart/update
export const updateCart = async (req, resp) => {
  try {
    // const userId = req.User; //from auth user decoded id
    const userId = req.user;

    const { cartItems } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }      //this means updated data will show
    );
    if(!updatedUser){
        return     resp.status(400).json({ message: " User not found", success:true});
    }
      return     resp.status(200).json({ updatedUser, success:true, message: " cart updated successfully"});
  } catch (error) {
    resp.status(500).json({ message: " Server error", error: error.message });
  }
};

// export const getCart = async (req, res) => {
//   try {
//     const userId = req.user; // SAME as updateCart

//     const user = await User.findById(userId).select("cartItems");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       cartItems: user.cartItems,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };
