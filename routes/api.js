import express, { Router } from "express";
import multer from "multer";
import {
    getShoes,
    postUser,
    getShoesBySearch,
    putUser,
    delUser,
    getShoesByBrand,
    get1Product,
    getUser,
    postToLogin,
    getProductBought,
    getCart,
    postProductToCart,
    dropProductInCart,
    dropCart,
    putCart,
    getQuantity,
    postOrder,
    getAllOrder,
    getProductInOrder,
    putOrder,
    dropOrder,
    createPayment,
    queryPayment,
    putPayment,
    getImage,
    mainCompareImage}  from '../controllers/APIController.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'D:/hoc/ttcs/public/image');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });

const router = express.Router();
router.get('/get-shoes', getShoes)
router.get('/get-shoes-by-brand', getShoesByBrand)
router.get('/get-shoes-by-search', getShoesBySearch)
router.get('/get-1-product', get1Product)
router.get('/get-user', getUser)
router.get('/get-product-bought', getProductBought)
router.get('/get-cart', getCart)
router.get('/get-quantity',getQuantity)
router.get('/get-image',getImage)
router.get('/get-all-order',getAllOrder)
router.get('/get-detail-order',getProductInOrder)
// router.get('/test',mainCompareImage)
router.get('/payment', createPayment)
router.get('/query-payment',queryPayment)

router.post('/post-user', postUser)
router.post('/post-to-login', postToLogin)
router.post('/post-product-to-cart', postProductToCart)
router.post('/post-image',upload.single('image'), mainCompareImage)
router.post('/post-order', postOrder)


router.put('/put-user', putUser)
router.put('/put-cart',putCart)
router.put('/put-order',putOrder)
router.put('/put-payment-order',putPayment)

router.delete('/delete-user', delUser)
router.delete('/delete-product-in-cart',dropProductInCart)
router.delete('/delete-cart',dropCart)
router.delete('/delete-order',dropOrder)

export default router