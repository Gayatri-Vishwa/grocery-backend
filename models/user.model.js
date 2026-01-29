import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: { type: Object, default: {} },
  },
  { minimize: false }  // means...  "Even if the object is empty, do not remove it — save it as {}."
);

const User= mongoose.model("User", userSchema)
export default User;