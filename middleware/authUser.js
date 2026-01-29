// this is a JWT authentication middleware in Express.
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const authUser=(req,resp,next)=>{          // this will check is user loggedin or not at the time of logout api, will pass thi sin logout route
    try {
        const {token}=req.cookies;                //getting token  from cookies...that means you must be using cookie-parser in index.js// app.use(cookieParser())
        if(!token){
              return resp.status(401).json({message:"UnAuthorize" ,success:false})
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        req.user= decoded.id;
        next();                                //next() → passes control to the next middleware or route handler if authentication succeeds
        

        
    } catch (error) {
        console.log(error)
        return resp.status(401).json({message:"UnAuthorize" ,success:false})
    }
}


//cart 
//  export const auth = (req, res, next) => {
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = decoded.id;   // ✅ VERY IMPORTANT
//   next();
// };
