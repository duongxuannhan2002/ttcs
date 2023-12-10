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

export const createUser = async (name, email, pass, address, phoneNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users(name, email, pass, address, phone_number) 
        values(?,?,?,?,?)
        `, [name, email, pass, address,phoneNumber], (error, results) => {
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

export const updateUser = async (name, email, address, phoneNumber,id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET
    name=?, email=?, address=?, phone_number=?
    WHERE id=?`,[name,email,address,phoneNumber,id], (error,results) => {
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
    connection.query(`SELECT product.*, brand.*
        FROM product
        JOIN brand ON product.id_brand = brand.id
        WHERE brand.name = ? OR product.name = ?`, [key, key], (error, results) => {
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

export const logIn = async (phoneNumber, pass) => {
  return new Promise((resolve,reject) => {
    connection.query(`select id, phone_number, name from users where phone_number = ? and pass = ?`,[phoneNumber, pass], (error, results) => {
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