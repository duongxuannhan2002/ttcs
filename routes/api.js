import express, { Router } from "express";
import {
    getShoes,
    postUser,
    getShoesBySearch,
    putUser,
    delUser,
    getShoesByBrand,
    get1Product,
    getUser,
    getToLogin}  from '../controllers/APIController.js'

const router = express.Router();
router.get('/get-shoes', getShoes)
router.get('/get-shoes-by-brand', getShoesByBrand)
router.get('/get-shoes-by-search', getShoesBySearch)
router.get('/get-1-product', get1Product)
router.get('/get-user', getUser)

router.post('/post-user', postUser)
router.post('/login', getToLogin)
// router.post('/post-order', postOrder)
// router.post('/post-order-item', postOrderItem)

router.put('/put-user', putUser)

router.delete('/delete-user', delUser)
export default router