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
    delProductInOrder,
    updatePayment,
    updateQuantity,
    readOderById,
    readIdSize
} from '../services/CRUDservice.js'
import Jwt from 'jsonwebtoken'
import moment from 'moment'
import querystring from 'qs'
import crypto from 'crypto'
import request from 'request'
import { setTimeout } from 'timers'

const delayAsync = async (milliseconds) => {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  };

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
    let id_size = req.body.id_size
    let quantity = req.body.quantity
    let id_user
    if (!token || !id_product || !size || !quantity) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    Jwt.verify(token, '05092002', function (err, decoded) {
        id_user = decoded.id
    });
    try {
        let results = await checkProductInCart(id_user, id_product, id_size)
        if (results.length > 0) {
            return res.status(200).json({
                massege: 'Sản phẩm đã có trong giỏ hàng',
            })
        } else {
            await createProductIntoCart(id_user, id_product, quantity, id_size)
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
    let id_size = req.body.id_size

    if (!id_user || !id_product || !size || !id_size) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await delProductInCart(id_user, id_product, id_size);
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
            await updateProductInCart(element.id_user, element.id_product, element.quantity, element.id_size);
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
        });
      }
    
      let id_user;
      Jwt.verify(token, '05092002', function (err, decoded) {
        id_user = decoded.id;
      });
    
      try {
        const results = await createOrder(id_user, order_date, address, phoneNumber, totalPrice, payment, status);
        let orderId = results.insertId;
    
        for (const e of products) {
          try {
            await createProductInOrder(orderId, e.id_product, e.id_size, e.quantity);
            await delayAsync(2000);
            await updateQuantity(e.id_product, e.id_size, e.quantity);
            await delayAsync(2000);
          } catch (err) {
            console.log("gặp lỗi này nè: ", err);
          }
        }
    
        return res.status(200).json({
          message: 'OK',
          data: orderId
        });
      } catch (error) {
        return res.status(409).json({ message: error.message });
      }
}

export const getAllOrder = async (req, res) => {
    if (req.query.id_user) {
        try {
            let results = await readOderById(req.query.id_user)
            return res.status(200).json({
                massege: 'ok',
                data: results
            })
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
        
    } else {
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

    if (!address || !phoneNumber || !status || !id_order) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await updateOrder(id_order, address, phoneNumber, status)
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
    return res.status(200).json({
        massege: 'OK',
    })
}

export const dropOrder = async (req, res) => {

    if (!req.query.id_order) {
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

export const createPayment = (req, res) => {

    if (!req.query.amount || !req.query.orderId) {
        return res.status(200).json({
            massege: 'Oh noooo',
        })
    }
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let tmnCode = "6RAZO02N"
    let secretKey = "BQVYJLEQMTAQKWXNGFYQPQAHKNPALWJN"
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    let returnUrl = "http://localhost:3000/query"
    let orderId = req.query.orderId
    let amount = req.query.amount
    let bankCode = ""

    let locale = "vn";
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);


    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return res.status(200).json({
        massege: 'OK',
        data: { vnpUrl, orderId, createDate }
    })
}

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export const queryPayment = (req, res, next) => {

    if (!req.query.orderId || !req.query.createDate) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let vnp_TmnCode = "6RAZO02N"
    let secretKey = "BQVYJLEQMTAQKWXNGFYQPQAHKNPALWJN"
    let vnp_Api = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction"

    let vnp_TxnRef = req.query.orderId
    let vnp_TransactionDate = req.query.createDate

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'querydr';
    let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let currCode = 'VND';
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    // /merchant_webapi/api/transaction
    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        res.send(response)
    });

}

export const putPayment = async (req, res) => {
    if (!req.query.orderId) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    try {
        await updatePayment(req.query.orderId)
        return res.status(200).json({
            message: 'oke'
        })
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }

}