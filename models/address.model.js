import mongoose, { Types } from "mongoose";

const addressSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    firstName:{type:String, require:true },
    lastName:{type:String, require:true },
    email:{type:String, require:true },
    street:{type:String, require:true },
    city:{type:String, require:true },
    state:{type:String, require:true },
    zipCode:{type:String, require:true },
    country:{type:String, require:true },
    phone:{type:String, require:true },
})

const Address=mongoose.model("Address",addressSchema)
export default Address