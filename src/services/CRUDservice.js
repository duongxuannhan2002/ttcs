const connection = require('../config/database')

const readListBook = async () => {
    let [results, fields] = await connection.query(
        ` select * from book
        `
    )
    return results
}

const createBook = async (name, date, price, quantity, imageString, lng, author_id, category_id) => {
    let [results, fields] = await connection.query(
        ` INSERT INTO book(name,publication_date,price,quantity,image,lng,author_id,category_id) 
        values(?,?,?,?,?,?,?,?)
        `, [name, date, price, quantity, imageString, lng, author_id, category_id],
    )
}

const updateBook = async (name, date, price, quantity, imageString, lng, author_id, category_id, id) => {
    let [results, fields] = await connection.query(
        `
        UPDATE book SET
        name = ?, publication_date = ?, price = ?, quantity = ?, image = ?, lng = ?, author_id = ?, category_id = ? 
        WHERE id = ?    
        `, [name, date, price, quantity, imageString, lng, author_id, category_id, id],
    )
}

const deleteBook = async (id) => {
    let [results, fields] = await connection.query(`DELETE FROM book WHERE id = ? `, [id])
}

const createUser = async (name, email, pass, address) => {
    let [results, fields] = await connection.query(
        ` INSERT INTO users(name, email, pass, address) 
        values(?,?,?,?)
        `, [name, email, pass, address],
    )
}


const changePassWordUser = async (id, pass) => {
    let [results, fields] = await connection.query(
        `UPDATE users SET pass = ? WHERE id = ?`, [pass, id])
}


const checkLogIn = async (email, pass) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM users WHERE email = ? AND pass = ?`, [email, pass])
    return results
}

const readListBooksByLng = async (lng) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM book WHERE lng = ?`, [lng])
    return results
}

const readListBooksByCategory = async (category) => {
    let [results, fields] = await connection.query(
        `SELECT * FROM book WHERE category = ?`, [category])
    return results
}

const readListBooksBySearch = async (key) => {
    let [results, fields] = await connection.query(
        `SELECT book.id, book.name, author.name AS author_name, book.price, book.quantity, book.category_id , book.image, book.lng
        FROM book
        JOIN author ON book.author_id  = author.id
        WHERE author.name = ? OR book.name = ?`, [key,key])
    return results
}

const createOrder = async (user_id, order_date) => {
    let [results, fields] = await connection.query(
        ` INSERT INTO orders(user_id, order_date) 
        values(?,?)
        `, [user_id, order_date]
    )
}

const createOrderItem = async (order_id, book_id, quantity) => {
    let [results, fields] = await connection.query(
        ` INSERT INTO order_item(order_id, book_id, quantity) 
        values(?,?,?)
        `, [order_id, book_id, quantity]
    )
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    readListBook,
    createUser,
    changePassWordUser,
    checkLogIn,
    readListBooksByLng,
    readListBooksByCategory,
    readListBooksBySearch,
    createOrder,
    createOrderItem
}