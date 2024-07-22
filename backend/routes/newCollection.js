import express from 'express'
import { getNewCollection } from '../controllers/newCollection.js'

// routes object
const router = express.Router()

// routing
/*router.post('/createproducts',(req,res){

}) esto huntheyo hola format but hame ya MVC pattern follow greraxau soo seperate controller create grxau
 */


router
    .route('/')
    .get(getNewCollection)

export default router;