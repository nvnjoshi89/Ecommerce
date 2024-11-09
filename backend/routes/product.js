import express from 'express'
import { createProduct, uploadProductDocument, getProduct, getProductById, deleteProductById } from '../controllers/product.js'

// routes object
const router = express.Router()

// routing
/*router.post('/createproducts',(req,res){

}) esto huntheyo hola format but hame ya MVC pattern follow greraxau soo seperate controller create grxau
 */

router
    .route('/')
    .post(uploadProductDocument, createProduct)
    .get(getProduct)


router
    .route('/:id')
    .get(getProductById)
    .delete(deleteProductById)
export default router;