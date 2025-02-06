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
    verifyOtp,
    getAllUser
    }  from '../controllers/APIController.js'
import { postCreateShoes, postDeleteShoes, postUpdateShoes, putUpdateQuantity } from "../controllers/homeController.js";
import Jwt from 'jsonwebtoken'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Token is required' });

  Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    next();
  });
};

const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.map(role => role.toLowerCase()).includes(req.user.role.toLowerCase())) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};


const router = express.Router();
router.get('/get-shoes',getShoes)
router.get('/get-shoes-by-brand', getShoesByBrand)
router.get('/get-shoes-by-search', getShoesBySearch)
router.get('/get-1-product', get1Product)
router.get('/get-user', authenticateToken ,authorizeRole(['User', 'Admin']), getUser)
router.get('/get-all-user', authenticateToken ,authorizeRole(['Admin']), getAllUser)
router.get('/get-product-bought', authenticateToken ,authorizeRole(['Admin']), getProductBought)
router.get('/get-cart', authenticateToken ,authorizeRole(['User', 'Admin']), getCart)
router.get('/get-quantity',getQuantity)
router.get('/get-image', authenticateToken ,authorizeRole(['User', 'Admin']),getImage)

router.get('/get-all-order', authenticateToken ,authorizeRole(['Admin',"User"]),getAllOrder)
router.get('/get-detail-order', authenticateToken ,authorizeRole(['User', 'Admin']),getProductInOrder)
// router.get('/test',mainCompareImage)
router.get('/payment' , authenticateToken ,authorizeRole(['User', 'Admin']), createPayment)
router.get('/query-payment', authenticateToken ,authorizeRole(['User', 'Admin']),queryPayment)
router.get('/change-pass', authenticateToken ,authorizeRole(['User', 'Admin']), changePass)
// router.get('/test', testPay)


router.post('/post-user', postUser)
router.post('/post-to-login', postToLogin)
router.post('/post-product-to-cart', authenticateToken ,authorizeRole(['User', 'Admin']), postProductToCart)
router.post('/post-image',upload.single('image'), mainCompareImage)
router.post('/post-order', authenticateToken ,authorizeRole(['User', 'Admin']), postOrder)
router.post('/create-shoes', authenticateToken, authorizeRole(['Admin']), upload.single('image'), postCreateShoes)
router.post('/update-shoes', authenticateToken ,authorizeRole(['Admin']),postUpdateShoes)
router.post('/update-size', authenticateToken ,authorizeRole(['Admin']),putUpdateQuantity)
router.post('/update-status', authenticateToken ,authorizeRole(['Admin']),putOrderStatus)
router.post('/verify-otp', verifyOtp)

router.put('/put-user', authenticateToken ,authorizeRole(['User', 'Admin']), putUser)
router.put('/put-cart', authenticateToken ,authorizeRole(['User', 'Admin']),putCart)
router.put('/put-order', authenticateToken ,authorizeRole(['Admin']),putOrder)
router.put('/put-payment-order', authenticateToken ,authorizeRole(['Admin']),putPayment)

router.delete('/delete-user', authenticateToken ,authorizeRole(['Admin']), delUser)
router.delete('/delete-product-in-cart', authenticateToken ,authorizeRole(['User', 'Admin']),dropProductInCart)
router.delete('/delete-cart', authenticateToken ,authorizeRole(['User', 'Admin']),dropCart)
router.delete('/delete-order', authenticateToken ,authorizeRole(['Admin']),dropOrder)
router.delete('/delete-shoes', authenticateToken ,authorizeRole(['Admin']),postDeleteShoes)



export default router