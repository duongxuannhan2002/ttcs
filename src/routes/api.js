const express = require('express')
const router = express.Router()
const {
    getBooks,
    postUser,
    putPassWordUser,
    getUser,
    getBooksByLng,
    getBooksByCategory,
    getBooksBySearch,
    postOrder,
    postOrderItem} = require('../controllers/APIController')

router.get('/get-book', getBooks)
router.get('/get-user', getUser)
router.get('/get-book-by-lng', getBooksByLng)
router.get('/get-book-by-category', getBooksByCategory)
router.get('/get-book-by-search',getBooksBySearch)

router.post('/post-user', postUser)
router.post('/post-order', postOrder)
router.post('/post-order-item', postOrderItem)

router.put('/put-password-user', putPassWordUser)

module.exports = router