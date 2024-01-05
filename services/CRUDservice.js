import connection from '../config/database.js'
import fs from 'fs'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
// import cv from "opencv4nodejs"


export const readListShoes = async () => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`SELECT * FROM product`, (error, results) => {
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

export const createShoes = async (name, price, quantity, imageString, brand, discount, sold) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(` INSERT INTO product(name, price, quantity, image, brand, discount, sold) 
        values(?,?,?,?,?,?,?)
        `, [name, price, quantity, imageString, brand, discount, sold], (error, results) => {
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

export const updateShoes = async (name, price, quantity, imageString, brand, discount, sold, id) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(` UPDATE product SET
        name=?, price=?, quantity=?, image=?, brand=?, discount=?, sold=?
        Where id=?    
        `, [name, price, quantity, imageString, brand, discount, sold, id], (error, results) => {
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
        connection.query(`SELECT product.* FROM product
    WHERE product.id = ?`, [id], (error, results) => {
          connection.release()
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
        connection.query(`SELECT id From size WHERE size = ?`, [size], (error, results) => {
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
        connection.query(`SELECT product.id as id_product, product.name,product.image, product.discount, product.price, cart_item.quantity, size.vl AS size
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
export const createProductIntoCart = async (id_user, id_product, id_size) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`INSERT INTO cart_item (id_user, id_product, quantity, id_size) VALUES (?, ?, ?, ?)`, [id_user, id_product, 1, id_size], (error, results) => {
          if (error) {
            connection.release();
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
        connection.query(`SELECT quantity from size_product
        JOIN size ON size.id = size_product.id_size
        WHERE size.vl = ? AND size_product.id_product = ?`, [size, id_product], (error, results) => {
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

export const updateQuantity = async (id_product,id_size, quantity) => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, connection) => {
      if (err) {
        console.error('lỗi kết nối: ', err);
        reject(err)
      } else {
        connection.query(`UPDATE size_product
        SET quantity = ?
        WHERE id_size=? AND id_product=?`, [quantity, id_size, id_product], (error, results) => {
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
        `,[id_user], (error, results) => {
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

export const mainCompareImage = async (req, res) => {

  function compareImages(imagePath1, imagePath2) {
     // Đọc ảnh từ đường dẫn
    const img1 = cv.imread(imagePath1);
    const img2 = cv.imread(imagePath2);

    // Chuyển đổi sang ảnh xám để dễ dàng so sánh
    const grayImg1 = img1.bgrToGray();
    const grayImg2 = img2.bgrToGray();

    // Tính histogram của ảnh
    const hist1 = cv.calcHist([grayImg1], [0], new cv.Mat(), [256], [0, 256]);
    const hist2 = cv.calcHist([grayImg2], [0], new cv.Mat(), [256], [0, 256]);

    // Tính sự tương đồng giữa hai histogram bằng cách sử dụng Bhattacharyya coefficient
    const bhattacharyyaCoefficient = cv.compareHist(hist1, hist2, cv.HISTCMP_BHATTACHARYYA);

    // Hiển thị kết quả
    console.log(`Hệ số Bhattacharyya: ${bhattacharyyaCoefficient}`);

    // Kiểm tra xem ảnh có gần giống nhau không
    if (bhattacharyyaCoefficient > 0.8) {
        console.log('Ảnh gần giống nhau.');
    } else {
        console.log('Ảnh không gần giống nhau.');
    }
  }

  // Thực hiện so sánh giữa hai ảnh
  compareImages('public/image/image1.jpg', 'public/image/image3.jpg');
  // public/image/image1.jpg

  // if (!req.file) {
  //   console.log('no image')
  // }

  // const list = await getImage();

  // list.forEach(async (e) => {
  //   await compareImages(req.file.path, e);
  // })
  // fs.unlink(req.file.path, (err) => {
  //   if (err) {
  //     console.log(err)
  //   }
  // })
}


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