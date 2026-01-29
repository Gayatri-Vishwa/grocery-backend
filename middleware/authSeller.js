// this is a JWT authentication middleware in Express.
import jwt from 'jsonwebtoken'


export const authSeller=(req,resp,next)=>{          // this will check is user loggedin or not at the time of logout api, will pass thi sin logout route
    try {
        const {sellerToken}=req.cookies;                //getting token  from cookies...that means you must be using cookie-parser in index.js// app.use(cookieParser())
        if(!sellerToken){
              return resp.status(401).json({message:"UnAuthorize" ,success:false})
        }
        const decoded =jwt.verify(sellerToken,process.env.JWT_SECRET)
        if(decoded.email===process.env.SELLER_EMAIL)
        next();                                //next() → passes control to the next middleware or route handler if authentication succeeds
        
    } catch (error) {
        console.log(error)
        return resp.status(401).json({message:"UnAuthorize" ,success:false})
    }
}
