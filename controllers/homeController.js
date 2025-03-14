import { log } from 'console';
import { createShoes, updateShoes, deleteShoes, createSizeProduct, checkSizeProduct, updateToChangeQuantity, deleteSize, checkIdSize, updateQuantity, updateSizeQuantity } from '../services/CRUDservice.js'
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
        let des = req.body.describe
        let size = JSON.parse(req.body.sizes)
        console.log(req.body)

        if (!name || !price || !brand || !discount || !size) {
            return res.status(200).json({
                message: 'oh NOOOOOO'
            })
        }
        try {
            let id_product = await createShoes(name, price, imageString, brand, discount, des)
            size.forEach(async e => {
                let id_size = await checkIdSize(e.size)
                console.log(id_size[0].id);

                await createSizeProduct(id_size[0].id, id_product.insertId, e.quantity, 0)
            });
            return res.status(200).json({
                massege: 'OK',
            })
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
}

export const postUpdateShoes = async (req, res) => {
        let id = req.body.id_shoes
        let price = req.body.price
        let discount = req.body.discount
        let describ = req.body.describ
        let brand = req.body.brand
        let sizes = req.body.sizes
        console.log(req.body);

        if (!id || !price || !discount) {
            return res.status(200).json({
                message: 'oh NOOOOOO'
            })
        }
        try {
            await updateShoes(id, price, discount, describ, brand)
            for (let key in sizes) {
                let id_size = await checkIdSize(key)
                await updateSizeQuantity(id, id_size[0].id, sizes[key])
            }
            return res.status(200).json({
                massege: 'OK',
            })
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    }

export const putUpdateQuantity = async (req, res) => {
    let id_shoes = req.body.id_shoes
    let id_size = req.body.id_size
    let quantity = req.body.quantity
    if (!id_shoes || !id_size || !quantity) {
        return res.status(200).json({
            message: 'oh nooooo'
        })
    }
    try {
        await updateToChangeQuantity(id_shoes, id_size, quantity)
        return res.status(200).json({
            massege: 'OK'
        })
    } catch (error) {
        return res.status(409)({ message: error.message });
    }
}

export const postDeleteShoes = async (req, res) => {
    let id = req.query.id_shoes
    try {
        await deleteSize(id);
        await deleteShoes(id);
        return res.status(200).json({
            massege: 'OK'
        })
    } catch (error) {
        return res.status(409)({ message: error.message });
    }
}