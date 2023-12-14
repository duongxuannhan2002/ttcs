import connection from '../config/database.js'

export const readListShoes = async () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT product.*, brand.name As name_brand, brand.country FROM product
    JOIN brand ON product.id_brand= brand.id`, (error, results) => {
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

export const createShoes = async (name, price, quantity, imageString, id_brand, discount, sold) => {
  return new Promise((resolve, reject) => {
    connection.query(` INSERT INTO product(name, price, quantity, image, id_brand, discount, sold) 
        values(?,?,?,?,?,?,?)
        `, [name, price, quantity, imageString, id_brand, discount, sold], (error, results) => {
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

export const updateShoes = async (name, price, quantity, imageString, id_brand, discount, sold, id) => {
  return new Promise((resolve, reject) => {
    connection.query(` UPDATE product SET
        name=?, price=?, quantity=?, image=?, id_brand=?, discount=?, sold=?
        Where id=?    
        `, [name, price, quantity, imageString, id_brand, discount, sold, id], (error, results) => {
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

export const readListUser = async() => {
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

export const updateUser = async (name, email, phoneNumber,id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET
    name=?, email=?, phone_number=?
    WHERE id=?`,[name,email,phoneNumber,id], (error,results) => {
      if (error) {
        console.log('Lỗi truy vấn: ',error);
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
    connection.query(`SELECT product.*, brand.* FROM product
    JOIN brand ON product.id_brand= brand.id
    WHERE brand.name = ?`, [brand], (error, results) => {
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
    connection.query(`SELECT product.*, brand.name as brand
        FROM product
        JOIN brand ON product.id_brand = brand.id
        WHERE LOWER(product.name) LIKE CONCAT('%', LOWER(?), '%');`, [key], (error, results) => {
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

export const readCheckBrand = async (name, country) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM brand
    WHERE name = ? AND country = ?`, [name, country], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        // console.log(results);
        resolve(results);
      }
    });
  });
}

export const createBrand = async (name, country) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO brand(name,country) 
    values(?,?)`,[name, country], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        reject(error);
      } else {
        // console.log(results);
        resolve(results);
      }
    });
  });
}

export const logIn = async (phoneNumber,pass) => {
  return new Promise((resolve,reject) => {
    connection.query(`select id, phone_number, name, pass from users where phone_number = ? and pass = ?`,[phoneNumber,pass], (error, results) => {
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
    connection.query(`SELECT product.*, brand.name As name_brand FROM product
    JOIN brand ON product.id_brand= brand.id
    WHERE product.id = ?`,[id], (error, results) => {
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
  return new Promise((resolve,reject) => {
    connection.query(`SELECT size.vl as size FROM size 
    JOIN size_product ON size_product.id_size = size.id 
    JOIN product ON size_product.id_product = product.id 
    WHERE product.id = ?;`,[id], (error, results) => {
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
  return new Promise((resolve,reject) => {
    connection.query(`select * from users where phone_number = ? `,[phoneNumber], (error,results) => {
      if (error) {
        console.error('Lỗi truy vấn: ',error);
        reject(error);
      } else {
        resolve(results);
      }
    } )
  })
}

export const readListProductBought = async (id_user) => {
  return new Promise((resolve,reject) => {
    connection.query(`SELECT product.name, orders.order_date, orders.address, orders.phone_number 
    FROM order_item 
    JOIN orders ON order_item.id_order=orders.id 
    JOIN product ON order_item.id_product=product.id 
    WHERE orders.id_user=?;`,[id_user], (error,results) => {
      if (error) {
        console.error('Lỗi truy vấn: ',error);
        reject(error);
      } else {
        resolve(results);
      }
    } )
  })
}