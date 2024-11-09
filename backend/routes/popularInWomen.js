import express from 'express'
import { getPopularInWomen } from '../controllers/popularInWomen.js'

// routes object
const router = express.Router()

// routing
/*router.post('/createproducts',(req,res){

}) esto huntheyo hola format but hame ya MVC pattern follow greraxau soo seperate controller create grxau
 */


router
    .route('/')
    .get(getPopularInWomen)

export default router