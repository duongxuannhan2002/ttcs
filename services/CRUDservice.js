import connection from '../config/database.js'

export const readListShoes = async () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM product`, (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const createShoes = async (name, price, quantity, imageString, brand, discount, sold) => {
  return new Promise((resolve, reject) => {
    connection.query(` INSERT INTO product(name, price, quantity, image, brand, discount, sold) 
        values(?,?,?,?,?,?,?)
        `, [name, price, quantity, imageString, brand, discount, sold], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const updateShoes = async (name, price, quantity, imageString, brand, discount, sold, id) => {
  return new Promise((resolve, reject) => {
    connection.query(` UPDATE product SET
        name=?, price=?, quantity=?, image=?, brand=?, discount=?, sold=?
        Where id=?    
        `, [name, price, quantity, imageString, brand, discount, sold, id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const deleteShoes = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM product WHERE id = ? `, [id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const readListUser = async () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users`, (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const createUser = async (name, email, pass, phoneNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users(name, email, pass, phone_number) 
        values(?,?,?,?)
        `, [name, email, pass, phoneNumber], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const updateUser = async (name, email, phoneNumber, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET
    name=?, email=?, phone_number=?
    WHERE id=?`, [name, email, phoneNumber, id], (error, results) => {
      if (error) {
        console.log('Lỗi truy vấn: ', error);
        reject(error)
      }
      else {
        console.log(results);
        resolve(results);
      }
    })
  })
}

export const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM users WHERE id = ? `, [id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const readListShoesByBrand = async (brand) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM product
    WHERE brand= ?`, [brand], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const readListShoesBySearch = async (key) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM product
        WHERE LOWER(name) LIKE CONCAT('%', LOWER(?), '%');`, [key], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}



export const logIn = async (phoneNumber, pass) => {
  return new Promise((resolve, reject) => {
    connection.query(`select id, phone_number, name, pass from users where phone_number = ? and pass = ?`, [phoneNumber, pass], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        // console.log(results);
        resolve(results);
      }
    });
  })
}

export const read1Product = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT product.* FROM product
    WHERE product.id = ?`, [id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
}

export const readSizeProduct = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT size.vl as size FROM size 
    JOIN size_product ON size_product.id_size = size.id 
    JOIN product ON size_product.id_product = product.id 
    WHERE product.id = ?;`, [id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        // console.log(results);
        resolve(results);
      }
    });
  })
}

export const checkPhoneNumber = async (phoneNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from users where phone_number = ? `, [phoneNumber], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

export const readListProductBought = async (id_user) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT product.name, orders.order_date, orders.address, orders.phone_number 
    FROM order_item 
    JOIN orders ON order_item.id_order=orders.id 
    JOIN product ON order_item.id_product=product.id 
    WHERE orders.id_user=?;`, [id_user], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

export const readCart = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT product.name, product.price, cart_item.quantity 
    FROM product JOIN cart_item ON cart_item.id_product = product.id
    WHERE cart_item.id_user = ?`, [id], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

export const checkProductInCart = async (id_user,id_product) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT product.name, product.price, cart_item.quantity 
    FROM product JOIN cart_item ON cart_item.id_product = product.id
    WHERE cart_item.id_user = ? AND product.id= ?`, [id_user,id_product], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}
export const createProductIntoCart = async (id_user, id_product, quantity) =>{
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO cart_item (id_user, id_product, quantity) VALUES (?, ?, ?)`, [id_user,id_product,quantity], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

export const delProductInCart = async (id_user, id_product) =>{
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM cart_item WHERE id_user = ? AND id_product = ?;`, [id_user,id_product], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

export const delCart = async (id_user) =>{
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM cart_item WHERE id_user = ? `, [id_user], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

export const updateProductInCart = async (id_user, id_product, quantity) =>{
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE cart_item
    SET quantity = ? 
    WHERE id_user = ? AND id_product = ?;`, [quantity,id_user,id_product], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn: ', error);
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}