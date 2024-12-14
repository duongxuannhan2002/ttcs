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
    mainCompareImage,
    changePass,
    putOrderStatus,
    }  from '../controllers/APIController.js'
import { postCreateShoes, postDeleteShoes, postUpdateShoes, putUpdateQuantity } from "../controllers/homeController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image');
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
router.get('/change-pass', changePass)
// router.get('/test', testPay)


router.post('/post-user', postUser)
router.post('/post-to-login', postToLogin)
router.post('/post-product-to-cart', postProductToCart)
router.post('/post-image',upload.single('image'), mainCompareImage)
router.post('/post-order', postOrder)
router.post('/create-shoes',upload.single('image'), postCreateShoes)
router.post('/update-shoes',postUpdateShoes)
router.post('/update-size',putUpdateQuantity)
router.post('/update-status',putOrderStatus)

router.put('/put-user', putUser)
router.put('/put-cart',putCart)
router.put('/put-order',putOrder)
router.put('/put-payment-order',putPayment)

router.delete('/delete-user', delUser)
router.delete('/delete-product-in-cart',dropProductInCart)
router.delete('/delete-cart',dropCart)
router.delete('/delete-order',dropOrder)
router.delete('/delete-shoes',postDeleteShoes)

export default router