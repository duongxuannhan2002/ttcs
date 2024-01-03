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
    readListProductBought,
    readCart,
    checkProductInCart,
    createProductIntoCart,
    delProductInCart,
    delCart,
    updateProductInCart,
    checkIdSize,
    readQuantity,
    createOrder,
    createProductInOrder,
    readAllOrder,
    readProductInOrder,
    updateOrder,
    delOrder,
    delProductInOrder
} from '../services/CRUDservice.js'
import Jwt from 'jsonwebtoken'

export const getShoes = async (req, res) => {
    try {
        let results = await readListShoes();
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
        if (results.length > 0) {
            return res.status(200).json({
                message: 'Số điện thoại đã được đăng ký'
            })
        } else {
            try {
                console.log(pass)
                await createUser(name, email, pass, phoneNumber)
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
        return res.status(200).json({
            message: 'ok men'
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const delUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        await deleteUser(id)
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
        let results2 = await readSizeProduct(req.query.id)

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
        let results = await logIn(req.body.phoneNumber, req.body.pass)
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
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getCart = async (req, res) => {
    let token = req.query.token
    if (!req.query.token) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    let id
    Jwt.verify(token, '05092002', function (err, decoded) {
        id = decoded.id
    });
    try {
        let results = await readCart(id)
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const postProductToCart = async (req, res) => {
    let token = req.body.token
    let id_product = req.body.id_product
    let size = req.body.size
    let id_user
    if (!token || !id_product || !size) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    Jwt.verify(token, '05092002', function (err, decoded) {
        id_user = decoded.id
    });
    try {
        let id_size = await checkIdSize(size)
        let results = await checkProductInCart(id_user, id_product, id_size[0].id)
        if (results.length > 0) {
            return res.status(200).json({
                massege: 'Sản phẩm đã có trong giỏ hàng',
            })
        } else {
            await createProductIntoCart(id_user, id_product, id_size[0].id)
            return res.status(200).json({
                massege: 'OK',
            })
        }
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const dropProductInCart = async (req, res) => {
    let id_user = req.body.id_user
    let id_product = req.body.id_product
    let size = req.body.size
    if (!id_user || !id_product || !size) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        let id_size = await checkIdSize(size)
        await delProductInCart(id_user, id_product, id_size[0].id);
        return res.status(200).json({
            massege: 'OK',
        })
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const dropCart = async (req, res) => {
    let id_user = req.query.id
    if (!id_user) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await delCart(id_user)
        return res.status(200).json({
            massege: 'OK',
        })
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const putCart = async (req, res) => {
    let listItem = req.body
    if (!req.body) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    listItem.forEach(async element => {
        try {
            let id_size = await checkIdSize(element.size)
            await updateProductInCart(element.id_user, element.id_product, element.quantity, id_size[0].id);
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    });
    return res.status(200).json({
        massege: 'OK',
    })
}

export const getQuantity = async (req, res) => {
    let id_product = req.query.id
    let size = req.query.size
    if (!id_product || !size) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        const results = await readQuantity(id_product, size)
        return res.status(200).json({
            massege: 'OK',
            data: results
        })
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const postOrder = async (req, res) => {
    let token = req.body.token
    let order_date = req.body.order_date
    let address = req.body.address
    let phoneNumber = req.body.phoneNumber
    let totalPrice = req.body.totalPrice
    let payment = req.body.payment
    let status = req.body.status
    let products = req.body.products

    if (!token || !order_date || !address || !phoneNumber || !totalPrice || !payment || !status || !products) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    let id_user
    Jwt.verify(token, '05092002', function (err, decoded) {
        id_user = decoded.id
    })
    try {
        const results = await createOrder(id_user, order_date, address, phoneNumber, totalPrice, payment, status)
        products.forEach(async e => {
            try {
                await createProductInOrder(results.insertId, e.id_product, e.id_size, e.quantity)
            } catch (err) {
                return res.status(409).json({ message: err.message });
            }
        });
        return res.status(200).json({
            massege: 'OK',
        })
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const getAllOrder = async (req, res) => {
    try {
        let results = await readAllOrder();
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProductInOrder = async (req, res) => {
    if (!req.query.id_order) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        let results = await readProductInOrder(req.query.id_order);
        return res.status(200).json({
            massege: 'ok',
            data: results
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const putOrder = async (req, res) => {
    let address = req.body.address
    let phoneNumber = req.body.phoneNumber
    let status = req.body.status
    let id_order = req.body.id_order
    
    if(!address ||!phoneNumber ||!status ||!id_order){
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await updateOrder(id_order,address,phoneNumber,status)
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
    return res.status(200).json({
        massege: 'OK',
    })
}

export const dropOrder = async (req, res) => {
    
    if(!req.query.id_order){
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await delProductInOrder(req.query.id_order)
        await delOrder(req.query.id_order)
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
    return res.status(200).json({
        massege: 'OK',
    })
}