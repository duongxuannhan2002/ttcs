import express, { Router } from "express";
import {
    getAdminPage,
    getAdminAdd,
    getAdminUpdate,
    getAdminDelete,
    postCreateShoes,
    postUpdateShoes,
    upload,
    postDeleteShoes
} from '../controllers/homeController.js'

const router = express.Router()

router.get('/', getAdminPage)
router.get('/add', getAdminAdd)
router.get('/update', getAdminUpdate)
router.get('/delete', getAdminDelete)

router.post('/create-shoes',upload.single('image'), postCreateShoes)
router.post('/update-shoes',upload.single('image'), postUpdateShoes)
router.post('/delete-shoes',postDeleteShoes)
export default router