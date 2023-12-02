import express, { Router } from "express";
import {
    getHomePage,
    getAdminPage,
    getAdminAdd,
    getAdminUpdate,
    getAdminDelete,
    getUploadFile,
    upload,
    postCreateBook,
    postUpdateBook,
    postDeleteBook
} from '../controllers/homeController.js'

const router = express.Router()

router.get('/', getHomePage)

router.get('/add', getAdminAdd)
router.get('/update', getAdminUpdate)
router.get('/delete', getAdminDelete)
router.get('/upload', getUploadFile)

router.post('/create-book', upload.single('image'), postCreateBook)
router.post('/update-book', upload.single('image'), postUpdateBook)
router.post('/delete-book', postDeleteBook)
// router.get('/check',checkCategory)
export default router