import uploadImageFireBase from './uploadImage.js'
import {
    readListShoes,
    createUser,
    readListBooksByLng,
    readListBooksBySearch,
    updateUser,
    createShoes,
    updateShoes,
    deleteShoes,
    deleteUser
} from '../services/CRUDservice.js'

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

export const getBooksBySearch = async (req, res) => {
    if (!req.body.key) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await readListBooksBySearch(req.body.key)
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
