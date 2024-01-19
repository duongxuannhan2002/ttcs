import connection from '../config/database.js'

export const readListShoes = async () => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT p.*, SUM(sp.sold) AS sold, SUM(sp.quantity) AS quantity  FROM product p 
        JOIN size_product sp ON p.id = sp.id_product 
        GROUP BY p.id, p.name;`, (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const createShoes = async (name, price, imageString, brand, discount) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(` INSERT INTO product(name, price, image, brand, discount) 
        values(?,?,?,?,?)
        `, [name, price, imageString, brand, discount], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const updateShoes = async (id, price, discount) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(` UPDATE product SET
        price=?, discount=?
        Where id=?    
        `, [price, discount, id], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const deleteShoes = async (id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`DELETE FROM product WHERE id = ? `, [id], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readListUser = async () => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM users`, (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const createUser = async (name, email, pass, phoneNumber) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`INSERT INTO users(name, email, pass, phone_number) 
        values(?,?,?,?)
        `, [name, email, pass, phoneNumber], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const updateUser = async (name, email, phoneNumber, id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE users SET
    name=?, email=?, phone_number=?
    WHERE id=?`, [name, email, phoneNumber, id], (error, results) => {
          connection.release();
          if (error) {
            console.log('Lỗi truy vấn: ', error);
            reject(error)
          }
          else {
            console.log(results);
            resolve(results);
          }
        })
      }
    })
  })
}

export const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`DELETE FROM users WHERE id = ? `, [id], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readListShoesByBrand = async (brand) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM product
    WHERE brand= ?`, [brand], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readListShoesBySearch = async (key) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM product
        WHERE LOWER(name) LIKE CONCAT('%', LOWER(?), '%');`, [key], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}



export const logIn = async (phoneNumber, pass) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`select id, phone_number, name, pass from users where phone_number = ? and pass = ?`, [phoneNumber, pass], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            // console.log(results);
            resolve(results);
          }
        });
      }
    })
  })
}

export const read1Product = async (id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT p.*, SUM(sp.sold) AS sold 
        FROM product p JOIN size_product sp ON p.id = sp.id_product 
        WHERE p.id=? GROUP BY p.id, p.name;`, [id], (error, results) => {
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readIdSize = async (size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT id From size WHERE vl = ?`, [size], (error, results) => {
          connection.release()
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            // console.log(results);
            resolve(results);
          }
        });
      }
    })
  })
}

export const createSizeProduct = async(id_size, id_product, quantity, sold) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`INSERT INTO size_product (id_size, id_product, quantity, sold) VALUES (?,?,?,?); `, [id_size,id_product,quantity,sold], (error, results) => {
          connection.release()
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            // console.log(results);
            resolve(results);
          }
        });
      }
    })
  })
}

export const readSizeProduct = async (id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT size.vl as size FROM size 
    JOIN size_product ON size_product.id_size = size.id 
    JOIN product ON size_product.id_product = product.id 
    WHERE product.id = ?;`, [id], (error, results) => {
          connection.release()
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            // console.log(results);
            resolve(results);
          }
        });
      }
    })
  })
}

export const checkPhoneNumber = async (phoneNumber) => {

  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`select * from users where phone_number = ? `, [phoneNumber], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const readListProductBought = async (id_user) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT product.name, orders.order_date, orders.address, orders.phone_number 
    FROM order_item 
    JOIN orders ON order_item.id_order=orders.id 
    JOIN product ON order_item.id_product=product.id 
    WHERE orders.id_user=?;`, [id_user], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const readCart = async (id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`
        SELECT product.id as id_product, product.name,product.image, product.discount, product.price, cart_item.quantity,cart_item.id_size, size.vl AS size
        FROM product JOIN cart_item ON cart_item.id_product = product.id
        JOIN size ON cart_item.id_size = size.id
        WHERE cart_item.id_user = ?`, [id], (error, results) => {
          connection.release()
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}



export const checkProductInCart = async (id_user, id_product, id_size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT product.name, product.price, cart_item.quantity, size.vl
                          FROM product JOIN cart_item ON cart_item.id_product = product.id
                          JOIN size ON cart_item.id_size = size.id
                          WHERE cart_item.id_user = ? AND product.id= ? AND size.id = ?`, [id_user, id_product, id_size], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const updateQuantityIntoCart = async (id_user, id_product, quantity, id_size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE cart_item SET quantity = quantity + ? 
        WHERE id_user = ? AND id_product = ? AND id_size`, [quantity, id_user, id_product, id_size], (error, results) => {
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const createProductIntoCart = async (id_user, id_product, quantity, id_size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`INSERT INTO cart_item (id_user, id_product, quantity, id_size) VALUES (?, ?, ?, ?)`, [id_user, id_product, quantity, id_size], (error, results) => {
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const delProductInCart = async (id_user, id_product, id_size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`DELETE FROM cart_item WHERE id_user = ? AND id_product = ? AND id_size = ?;`, [id_user, id_product, id_size], (error, results) => {
          if (error) {
            connection.release();
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            console.log('>>>', results)
            resolve(results);
          }
        })
      }
    })
  })
}

export const delCart = async (id_user) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`DELETE FROM cart_item WHERE id_user = ? `, [id_user], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const updateProductInCart = async (id_user, id_product, quantity, id_size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE cart_item
        SET quantity = ? 
        WHERE id_user = ? AND id_product = ? AND id_size = ?;`, [quantity, id_user, id_product, id_size], (error, results) => {
          connection.release()
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}
export const checkIdSize = async (size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT id from size WHERE vl = ?`, [size], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}
export const readQuantity = async (id_product, size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT quantity, id_size, size.vl as size 
        from size_product 
        JOIN size ON size.id = size_product.id_size 
        WHERE size.vl = ? AND size_product.id_product = ?;`, [size, id_product], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const updateQuantity = async (id_product, id_size, quantity) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE size_product
        SET quantity = quantity - ?, sold = sold + ?
        WHERE id_size=? AND id_product=?`, [quantity, quantity, id_size, id_product], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const createOrder = async (id_user, order_date, address, phoneNumber, totalPrice, payment, status) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`INSERT INTO orders (id_user, order_date, address, phone_number, total_price, payment, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [id_user, order_date, address, phoneNumber, totalPrice, payment, status], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const createProductInOrder = async (id_order, id_product, id_size, quantity) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`INSERT INTO order_item (id_order, id_product, id_size, quantity) 
        VALUES (?, ?, ?, ?);
        `, [id_order, id_product, id_size, quantity], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readAllOrder = async () => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM orders
        `, (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readOderById = (id_user) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM orders WHERE id_user = ?
        `, [id_user], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const readProductInOrder = async (id_order) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT product.name ,product.image, size.vl as size, order_item.quantity
        FROM product JOIN order_item ON order_item.id_product= product.id
        JOIN size ON order_item.id_size = size.id
        WHERE order_item.id_order = ?;
        `, [id_order], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn:', error);
            reject(error);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      }
    })
  });
}

export const updateOrder = async (id_order, address, phoneNumber, status) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE orders
        SET address = ?, phone_number = ?, status = ? 
        WHERE id_order`, [address, phoneNumber, status, id_order], (error, results) => {
          connection.release()
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const delOrder = async (id_order) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`DELETE FROM orders WHERE id = ? `, [id_order], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const delProductInOrder = async (id_order) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`DELETE FROM order_item WHERE id_order = ? `, [id_order], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const updatePayment = async (id_order) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE orders
        SET payment = online
        WHERE id = ?`, [id_order], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const readPass = (id, pass) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM users u WHERE id = ? ANd pass = ?`, [id, pass], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const updatePass = (newPass,id) =>{
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE users
        SET pass = ?
        WHERE id = ?`, [newPass,id], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const checkSizeProduct = (id_product,id_size) =>{
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM size_product WHERE id_product = ? AND id_size = ?`, [id_product,id_size], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}

export const updateToChangeQuantity = (id_product, id_size, quantity) =>{
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE size_product
        SET quantity = ?
        WHERE id_product = ? AND id_size = ?`, [quantity, id_product, id_size], (error, results) => {
          connection.release();
          if (error) {
            console.error('Lỗi truy vấn: ', error);
            reject(error);
          } else {
            resolve(results);
          }
        })
      }
    })
  })
}