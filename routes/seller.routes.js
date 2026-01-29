import express from 'express'
import { authSeller } from '../middleware/authSeller.js'
import { sellerLogin, sellerLogout ,isAuthSeller } from '../controllers/seller.controller.js'


const router =express.Router()

router.post('/login',sellerLogin)
router.get('/is-auth',authSeller,isAuthSeller)
router.get('/logout',authSeller,sellerLogout)

export default router