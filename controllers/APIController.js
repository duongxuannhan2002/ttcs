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
    readIdSize,
    readPass,
    updatePass,
    readUser,
    updateOrderStatus
} from '../services/CRUDservice.js'
import Jwt from 'jsonwebtoken'
import moment from 'moment'
import querystring from 'qs'
import crypto from 'crypto'
import request from 'request'
import { setTimeout } from 'timers'
import fs from 'fs'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { exec } from 'child_process'
import { promisify } from 'util';
import { log } from 'console'

const execAsync = promisify(exec);


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
    if (req.query.token) {
        let id
        Jwt.verify(req.query.token, '05092002', function (err, decoded) {
            try {
                id = decoded.id
            } catch (error) {
                console.log(error)
            }        
        });
        try {
            let results = await readUser(id)
            return res.status(200).json({
                massege: 'ok',
                data: results
            })
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    } else {
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
}

export const postUser = async (req, res) => {
    console.log(req.body)
    let name = req.body.name
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber
    let pass = req.body.pass
    if (!email || !name || !pass || !phoneNumber) {
        return res.status(200).json({
            message: 'vui lòng nhập đầy đủ thông tin'
        })
    }

    try {
        let results = await checkPhoneNumber(phoneNumber)
        if (results.length > 0) {
            return res.status(200).json({
                error: 'Số điện thoại đã được đăng ký'
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

    try {
        let results1 = await read1Product(req.query.id)
        try {
            let results2 = await readSizeProduct(req.query.id)

            const sizes = results2.map(item => item.size);
            results1[0].size = sizes.join(',');

            return res.status(200).json({
                massege: 'ok',
                data: results1
            })
        } catch (err) {
            res.status(409).json({ message: err.message });
            console.log(err);
        }

    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

export const postToLogin = async (req, res) => {

    if (!req.body.phoneNumber || !req.body.pass) {
        return res.status(200).json({
            message: 'Vui lòng nhập đủ thông tin'
        })
    }

    try {
        let results = await logIn(req.body.phoneNumber, req.body.pass)
        if (results.length !== 0) {
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
    if (!req.query.token || req.query.token == 'null') {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    console.log(req.query);
    let id
    Jwt.verify(token, '05092002', function (err, decoded) {
        try {
            id = decoded.id
        } catch (error) {
            console.log(error)
        }

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
    let quantity = req.body.quantity
    let id_user
    console.log(req.body);

    if (!token || !id_product || !size || !quantity) {
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
        console.log(results);

        if (results.length > 0) {
            return res.status(200).json({
                messErr: 'Sản phẩm đã có sẵn trong giỏ hàng',
            })
        } else {
            await createProductIntoCart(id_user, id_product, quantity, id_size[0].id)
            return res.status(200).json({
                messSuc: 'Thêm vào giỏ hàng thành công',
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

    console.log(req.body);

    if (!id_user || !id_product || !size) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        let id_size = await checkIdSize(size)
        await delProductInCart(id_user, id_product, id_size[0].id);
        return res.status(200).json({
            message: 'OK',
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
    console.log(req.body);
    let id_user = req.body.id_user
    let order_date = req.body.order_date
    let address = req.body.address
    let phoneNumber = req.body.phoneNumber
    let totalPrice = req.body.totalPrice
    let payment = req.body.payment
    let status = req.body.status
    let products = req.body.products

    console.log(req.body);
    if (!id_user === null || !order_date || !address || !phoneNumber || !totalPrice || !payment || !status || !products) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }


    try {
        const results = await createOrder(id_user, order_date, address, phoneNumber, totalPrice, payment, status);
        let orderId = results.insertId;

        for (const e of products) {
            try {
                console.log(e);
                let id_size = await checkIdSize(e.size)
                await createProductInOrder(orderId, e.id_product, id_size[0].id, e.quantity)
                await updateQuantity(e.id_product, id_size[0].id, e.quantity);
            } catch (err) {
                console.log("gặp lỗi này nè: ", err);
            }
        }
        return res.status(200).json({
            message: 'Thành công',
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

export const putOrderStatus = async (req, res) => {
    let status = req.body.status
    let id_order = req.body.id_order

    if (!status || !id_order) {
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }

    try {
        await updateOrderStatus(id_order, status)
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

export const changePass = async (req, res) => {
    let id = req.query.id
    let pass = req.query.pass
    let newPass = req.query.newPass

    if (!id || !pass | !newPass) {
        return res.status(200).json({
            error: 'Vui lòng nhập đủ thông tin'
        })
    }
    try {
        let results = await readPass(id, pass)
        if (results.length != 0) {
            await updatePass(newPass, id)
            return res.status(200).json({
                message: 'Thay đổi thành công',
            })
        } else {
            return res.status(200).json({
                error: 'Mật khẩu cũ không đúng',
            })
        }
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

// import { ProductCode, VnpLocale, dateFormat } from 'vnpay';
// import { VNPay, ignoreLogger } from 'vnpay';

// const vnpay = new VNPay({
//     tmnCode: '6RAZO02N',
//     secureSecret: 'BQVYJLEQMTAQKWXNGFYQPQAHKNPALWJN',
//     vnpayHost: 'https://sandbox.vnpayment.vn',
//     testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
//     hashAlgorithm: 'SHA512', // tùy chọn

//     /**
//      * Sử dụng enableLog để bật/tắt logger
//      * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
//      */
//     enableLog: true, // optional

//     /**
//      * Hàm `loggerFn` sẽ được gọi để ghi log
//      * Mặc định, loggerFn sẽ ghi log ra console
//      * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
//      *
//      * `ignoreLogger` là một hàm không làm gì cả
//      */
//     loggerFn: ignoreLogger, // optional
// });

// export const testPay = async (req, res) => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     const paymentUrl = vnpay.buildPaymentUrl({
//         vnp_Amount: 10000,
//         vnp_IpAddr: '13.160.92.202',
//         vnp_TxnRef: '12345',
//         vnp_OrderInfo: 'Thanh toan don hang 12345',
//         vnp_OrderType: ProductCode.Other,
//         vnp_ReturnUrl: 'http://localhost:3000/vnpay-return',
//         vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
//         vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là hiện tại
//         vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
//     });
//     return res.status(200).json({
//         message: paymentUrl,
//     })
// }

export const createPayment = (req, res) => {

    if (!req.query.amount) {
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


    let tmnCode = "59ND9W60"
    let secretKey = "FO7QOAR8JRN8RJPEI6CLN4GCV4QKFJQI"
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    let returnUrl = "https://next-shop-gules.vercel.app/query-payment"
    let orderId = createDate
    let amount = req.query.amount
    let bankCode = "VNBANK"

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

export const mainCompareImage = async (req, res) => {
    if (!req.file) {
        console.log('No image');
        return res.status(200).json({
            message: 'oh NOOOOOO'
        })
    }
    let data = [];
    const list = await getImage();
    for (const e of list) {
        let image = await compareImages(req.file.path, e, data);
        if (image != null) {
            data.push(image);
        }
    }
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.log(err);
        }
    });
    return res.status(200).json({
        massege: 'OK',
        data: data
    })
};

const compareImages = async (image1Path, image2Path) => {
    const pythonScriptPath = "./services/cpImage.py";
    const command = `python "${pythonScriptPath}" "${image1Path}" "${image2Path}"`;

    try {
        const { stdout } = await execAsync(command);
        // console.log('Command Output (stdout):', stdout);
        const matchRatio = parseFloat(stdout.trim());
        // console.log('>>>>>', matchRatio)
        if (!isNaN(matchRatio) && matchRatio > 25) {
            console.log('score: ', matchRatio, '   ->>>>Images are similar.', image2Path);
            return image2Path
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

export const getImage = async () => {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, 'images');

    try {
        const res = await listAll(listRef);
        const promises = res.items.map(async (itemRef) => {
            try {
                const url = await getDownloadURL(itemRef);
                return url;
            } catch (error) {
                console.log(error);
                return null; // Hoặc giá trị mặc định khi có lỗi xảy ra
            }
        });

        const list = await Promise.all(promises);
        const filteredList = list.filter(url => url !== null);
        return filteredList;
    } catch (error) {
        console.log(error);
        return [];
    }
};