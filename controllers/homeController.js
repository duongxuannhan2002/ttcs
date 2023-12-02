import connection from '../config/database.js'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { createBook,
    updateBook,
    deleteBook } from '../services/CRUDservice.js'

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

export const uploadFile = (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    const file = req.file;
    const imagePath = file.path;
    const base64String = fs.readFileSync(imagePath, { encoding: 'base64' });
    fs.unlink(imagePath, (err => {
        if (err) console.log(err);
    }));
    return base64String


}
export const getUploadFile = (req, res) => {
    res.render('upload.ejs')
}

export const checkAuthor = async (name, birth) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM author
        WHERE name = ? AND birth = ?`, [name, birth]
    )
    if (results.length == 0) {
        let [resultss, fields] = await connection.query(
            ` INSERT INTO author(name,birth) 
            values(?,?)
            `, [name, birth],
        )
        return resultss.insertId
    } else {
        return results[0].id
    }
}

export const checkCategory = async (name) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM category
        WHERE name = ? `, [name]
    )
    if (results.length == 0) {
        let [resultss, fields] = await connection.query(
            ` INSERT INTO category(name) 
            values(?)
            `, [name],
        )
        return resultss.insertId
    } else {
        return results[0].id
    }
}

export const postCreateBook = async (req, res) => {
    const imageString = await uploadFile(req, res)
    let name = req.body.name
    let date = req.body.date
    let price = req.body.price
    let quantity = req.body.quantity
    let lng = req.body.lng
    let author = req.body.author
    let birth_author = req.body.birth_author
    let category = req.body.category
    let author_id = await checkAuthor(author, birth_author)
    let category_id = await checkCategory(category)
    await createBook(name, date, price, quantity, imageString, lng, author_id, category_id)
    res.send("success")
}

export const postUpdateBook = async (req, res) => {
    const imageString = await uploadFile(req, res)
    let id = req.body.id_book
    let name = req.body.name
    let date = req.body.date
    let price = req.body.price
    let quantity = req.body.quantity
    let lng = req.body.lng
    let author = req.body.author
    let birth_author = req.body.birth_author
    let category = req.body.category
    let author_id = await checkAuthor(author, birth_author)
    let category_id = await checkCategory(category)
    await updateBook(name, date, price, quantity, imageString, lng, author_id, category_id, id)
    res.send("success")
}

export const postDeleteBook = async (req, res) => {
    let id = req.body.id_book
    await deleteBook(id)
    res.send('success')
}

