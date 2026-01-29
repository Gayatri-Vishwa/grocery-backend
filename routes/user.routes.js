import express from 'express'
import { registerUser, loginUser, logeOutUser, isAuthUser } from '../controllers/user.Controller.js'
import { authUser } from '../middleware/authUser.js' //will check user loggedin or not for logout route

const router =express.Router()

router.post('/register', registerUser)  // creates routes
router.post('/login',loginUser)
router.get('/logout',authUser,logeOutUser)  //authuser will check is loggedin ?
router.get('/is-auth',authUser,isAuthUser)  //authuser will check is loggedin ?



export default router