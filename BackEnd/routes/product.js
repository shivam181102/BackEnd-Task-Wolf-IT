import express from "express"
import { allProducts,createCart,Newcart,showCart,deleteCart } from "../controller/ProductContron.js"

const router = express.Router()

router
    .get('/allproducts',allProducts)
    .post('/cart',createCart)
    .post('/delcart',deleteCart)
    // .post('/login',loginUser)
    .delete('/NewCart',Newcart)
    .get('/cartDetails',showCart)
export default router