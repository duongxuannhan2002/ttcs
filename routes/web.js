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
    postDeleteBook} from '../controllers/homeController.js'

const router = express.Router()

router.get('/', getHomePage)

router.get('/admin',getAdminPage)
router.get('/admin/add',getAdminAdd)
router.get('/admin/update',getAdminUpdate)
router.get('/admin/delete',getAdminDelete)
router.get('/admin/upload',getUploadFile)

router.post('/create-book',upload.single('image'),postCreateBook)
router.post('/update-book',upload.single('image'),postUpdateBook)
router.post('/delete-book',postDeleteBook)
// router.get('/check',checkCategory)
export default router