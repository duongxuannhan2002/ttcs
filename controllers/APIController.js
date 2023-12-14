import uploadImageFireBase from './uploadImage.js'
import connection from '../config/database.js'
import bcrypt from 'bcrypt'
import {
    readListShoes,
    createUser,
    updateUser,
    deleteUser,
    logIn,
    read1Product,
    readSizeProduct,
    readListUser,
    checkPhoneNumber,
    readListShoesBySearch,
    readListShoesByBrand,
    readListProductBought
} from '../services/CRUDservice.js'
import Jwt from 'jsonwebtoken'

export const getShoes = async (req, res) => {
    try {
        let results = await readListShoes();
        connection.release;
        console.log('a', results)
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        let results = await readListUser()
        connection.release;
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const postUser = async (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber
    let pass = req.body.pass
    if (!email || !name || !pass || !phoneNumber) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        let results = await checkPhoneNumber(phoneNumber)
        connection.release;
        if (results.length > 0) {
            return res.status(200).json({
                message: 'Số điện thoại đã được đăng ký'
            })
        } else {
            try {
                console.log(pass)
                await createUser(name, email, pass, phoneNumber)
                connection.release;
                return res.status(200).json({
                    message: 'ok men',
                })
            } catch (error) {
                res.status(409).json({ message: error.message });
            }
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const putUser = async (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber
    let id = req.body.id
    if (!email || !name || !phoneNumber || !id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await updateUser(name, email, phoneNumber, id);
        connection.release;
        return res.status(200).json({
            message: 'ok men'
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const delUser = async (req, res) => {
    let id = req.params.id
    if (!id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        await deleteUser(id)
        connection.release;
        return res.status(200).json({
            message: 'ok men'
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getShoesByBrand = async (req, res) => {
    if (!req.body.brand) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await readListShoesByBrand(req.body.brand)
        connection.release;
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getShoesBySearch = async (req, res) => {
    if (!req.query.key) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        let results = await readListShoesBySearch(req.query.key)
        connection.release;
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const get1Product = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    console.log(req.query.id)

    try {
        let results1 = await read1Product(req.query.id)
        connection.release;
        let results2 = await readSizeProduct(req.query.id)
        connection.release;

        const sizes = results2.map(item => item.size);
        results1[0].size = sizes.join(',');

        return res.status(200).json({
            massege: 'ok',
            data: results1
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const postToLogin = async (req, res) => {

    if (!req.body.phoneNumber || !req.body.pass) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await logIn(req.body.phoneNumber||req.body.pass)

        if (results) {
            let token = Jwt.sign({ id: results[0].id }, '05092002');
            Jwt.verify(token, '05092002', function (err, decoded) {
                console.log('a', decoded) // bar
            });
            return res.status(200).json({
                data: results[0], token
            })
        } else {
            return res.status(200).json({
                message: 'Tài khoản hoặc mật khẩu không chính xác'
            })
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProductBought = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await readListProductBought(req.query.id)
        connection.release;
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}