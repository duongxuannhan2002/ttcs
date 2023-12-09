import express, { Router } from "express";
import {
    getShoes,
    postUser,
    getBooksByLng,
    getBooksBySearch,
    putUser,
    delUser,
    getShoesByBrand}  from '../controllers/APIController.js'

const router = express.Router();
router.get('/get-shoes', getShoes)
router.get('/get-book-by-lng', getBooksByLng)
router.get('/get-shoes-by-brand', getShoesByBrand)
router.get('/get-book-by-search',getBooksBySearch)

router.post('/post-user', postUser)
// router.post('/post-order', postOrder)
// router.post('/post-order-item', postOrderItem)

router.put('/put-user', putUser)

router.delete('/delete-user', delUser)
export default router