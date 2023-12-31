import {createShoes, updateShoes, deleteShoes} from '../services/CRUDservice.js'
import uploadImageFireBase from './uploadImage.js'
import multer from 'multer'
import path from 'path'
export const getHomePage = (req, res) => {
    res.send('<h1>Xin chào</h1>')
}
export const getAdminPage = (req, res) => {
    res.render('adminHome.ejs')
}

export const getAdminAdd = (req, res) => {
    res.render('adminAdd.ejs')
}

export const getAdminUpdate = (req, res) => {
    res.render('adminUpdate.ejs')
}

export const getAdminDelete = (req, res) => {
    res.render('adminDelete.ejs')
}

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

export let upload = multer({ storage: storage, fileFilter: imageFilter });


export const postCreateShoes = async (req, res) => {
    let imageString = await uploadImageFireBase(req.file)
    console.log('imageString', imageString)
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let brand = req.body.brand
    let discount = req.body.discount
    await createShoes(name, price, quantity, imageString, brand, discount,'0')
    res.send(`<img src="${imageString}">`)
}

export const postUpdateShoes = async (req, res) => {
    let imageString = await uploadImageFireBase(req.file)
    console.log('imageString', imageString)
    let id = req.body.id_shoes
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let brand = req.body.brand
    let discount = req.body.discount
    await updateShoes(name, price, quantity, imageString, discount,'0',id)
    res.send(`<img src="${imageString}">`)
}

export const postDeleteShoes = async (req, res) => {
    let id = req.body.id_shoes
    await deleteShoes(id)
    res.send('success')
}