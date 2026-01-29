import express from 'express'
import { updateCart } from '../controllers/cart.controller.js'
import { authUser } from '../middleware/authUser.js'
// import{auth} from '../middleware/authUser.js'


const router =express.Router()

router.post('/update',authUser,updateCart)
router.post('/get',authUser,updateCart)

export default router
