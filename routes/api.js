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
    postOrder}  from '../controllers/APIController.js'
import { getImage, mainCompareImage } from "../services/CRUDservice.js";

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

router.post('/post-user', postUser)
router.post('/post-to-login', postToLogin)
router.post('/post-product-to-cart', postProductToCart)
router.post('/post-image',upload.single('image'), mainCompareImage)
router.post('/post-order', postOrder)
// router.post('/post-order-item', postOrderItem)

router.put('/put-user', putUser)
router.put('/put-cart',putCart)

router.delete('/delete-user/:id', delUser)
router.delete('/delete-product-in-cart',dropProductInCart)
router.delete('/delete-cart',dropCart)

export default router