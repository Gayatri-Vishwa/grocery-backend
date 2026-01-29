import express from 'express'
import { authUser } from '../middleware/authUser.js';
import {getUserOrders , placeOrderCOD, getAllOrders} from '../controllers/order.controller.js'

const router =express.Router();
 router.post('/cod', authUser , placeOrderCOD)
 router.get('/user', authUser , getUserOrders)
 router.get('/seller', authUser , getAllOrders)

 export default router