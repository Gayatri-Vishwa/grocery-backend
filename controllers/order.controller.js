import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";



export const placeOrderCOD = async (req, resp) => {
  try {
    const userId = req.user; 
    const { items, address } = req.body;

    if (!items || !address) {
      return resp.status(400).json({
        message: "items and address are required",
        success: false,
      });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error("Product not found");
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor((amount * 2) / 100); // tax

    // ✅ create order
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

   
    await User.findByIdAndUpdate(userId, {
      cartItems: {},
    });

    return resp.status(200).json({
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error placing order", error);
    return resp.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};





//order details for individual user :    /api/order/user  //not COD
export const getUserOrders = async (req, resp) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: false }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return resp.status(200).json({ orders, success: true });
  } catch (error) {
    console.log("Error placing order", error);
    return resp.status(500).json({ message: "internal server error" });
  }
};





//get all orders for admin  :  /api/order/seller
export const getAllOrders = async (req, resp) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: false }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return resp.status(200).json({ orders, success: true });
  } catch (error) {
    console.log("Error placing order", error);
    return resp.status(500).json({ message: "internal server error" });
  }
};
