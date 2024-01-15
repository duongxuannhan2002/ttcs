import {createShoes, updateShoes, deleteShoes, createSizeProduct} from '../services/CRUDservice.js'
import uploadImageFireBase from './uploadImage.js'
import multer from 'multer'
import path from 'path'

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
    let brand = req.body.brand
    let discount = req.body.discount
    let size = JSON.parse(req.body.sizes)
    console.log(size)
    if(!name||!price||!brand||!discount||!size){
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let id_product = await createShoes(name, price, imageString, brand, discount)
        size.forEach(async e => {
            await createSizeProduct(e.id_size, id_product.insertId, e.quantity, 0)
        });
        return res.status(200).json({
            massege: 'OK',
        })
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
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