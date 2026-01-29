import Address from '../models/address.model.js'
 
//   add address: /api/address/add
export  const addAddress=async(req , resp)=>{
    try {
        const userId= req.user;
        const {address }=req.body
        await Address.create({
            ...address,userId,
        })
      return resp.status(200).json({message:"Address added successfully" , success:true})
    } catch (error) {
         console.log("Error placing order", error);
         return resp.status(500).json({message:"internal server error"})
    }
}


//get address : /api/address/get
export const getAddress=async(req, resp)=>{
     try {
        const userId= req.user;
      const addresses =await Address.find({userId}).sort({createdAt:-1})
      return resp.status(200).json({addresses , success:true})
    } catch (error) {
         console.log("Error placing order", error);
         return resp.status(500).json({message:"internal server error"})
    }
}