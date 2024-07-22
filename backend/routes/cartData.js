import express from 'express'
import { createCartData, getCartData, removeCartData } from '../controllers/cartData.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router
    .route('/')
    .post(authMiddleware, createCartData)
    .get(authMiddleware, getCartData)

router
    .route('/remove')
    .post(authMiddleware, removeCartData)

export default router;