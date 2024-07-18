import express from 'express'
import { createUser, login } from '../controllers/user.js'

// routes object
const router = express.Router()


// routing
/*router.post('/createproducts',(req,res){

}) esto huntheyo hola format but hame ya MVC pattern follow greraxau soo seperate controller create grxau
 */

router
    .route('/signup')
    .post(createUser)

router
    .route('/login')
    .post(login)

export default router;