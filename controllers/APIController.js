import uploadImageFireBase from './uploadImage.js'
import {
    readListShoes,
    createUser,
    updateUser,
    createShoes,
    updateShoes,
    deleteShoes,
    deleteUser,
    logIn,
    read1Product,
    readSizeProduct
} from '../services/CRUDservice.js'
import  Jwt  from 'jsonwebtoken'
import { response } from 'express'

export const getShoes = async (req, res) => {
    try {
        let results = await readListShoes()
        console.log('a', results)
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
    let address = req.body.address
    if (!email || !name || !pass || !address || !phoneNumber) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        createUser(name, email, pass, address, phoneNumber)
        return res.status(200).json({
            message: 'ok men'
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const putUser = (req, res) =>{
    let name = req.body.name
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber
    let address = req.body.address
    let id = req.body.id
    if (!email || !name || !address || !phoneNumber ||!id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        updateUser(name, email, address, phoneNumber, id)
        return res.status(200).json({
            message: 'ok men'
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const delUser = (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        deleteUser(id)
        return res.status(200).json({
            message: 'ok men'
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getBooksByLng = async (req, res) => {
    if (!req.body.lng) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await readListBooksByLng(req.body.lng)
        return res.status(200).json({
            massege: 'ok',
            data: results
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
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getShoesBySearch = async (req, res) => {
    if (!req.body.key) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await readListShoesBySearch(req.body.key)
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const get1Product = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results1 = await read1Product(req.body.id)
        let results2 = await readSizeProduct(req.body.id)

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

export const getAccount = async (req, res) => {

    if(!req.body.phoneNumber|| !req.body.pass){
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await logIn(req.body.phoneNumber, req.body.pass)
        let token =  Jwt.sign({ id: results[0].id }, 'shhhhh');
        Jwt.verify(token, 'shhhhh', function(err, decoded) {
            console.log('a' ,decoded) // bar
          });
        return res.status(200).json({
            data: results[0], token
        })
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}


