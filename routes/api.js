import express, { Router } from "express";
import {
    getBooks,
    postUser,
    putPassWordUser,
    getUser,
    getBooksByLng,
    getBooksByCategory,
    getBooksBySearch,
    postOrder,
    postOrderItem}  from '../controllers/APIController.js'

const router = express.Router();
router.get('/get-book', getBooks)
router.get('/get-user', getUser)
router.get('/get-book-by-lng', getBooksByLng)
router.get('/get-book-by-category', getBooksByCategory)
router.get('/get-book-by-search',getBooksBySearch)

router.post('/post-user', postUser)
router.post('/post-order', postOrder)
router.post('/post-order-item', postOrderItem)

router.put('/put-password-user', putPassWordUser)

export default router