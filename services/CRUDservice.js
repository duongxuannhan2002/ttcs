import { log } from '@tensorflow/tfjs';
import pool from '../config/database.js'



export const queryWithConnection = async (queryFunction) => {
  const connection = await pool.promise().getConnection();
  try {
    return await queryFunction(connection);
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

export const read1Product = async (id) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT p.*, SUM(sp.sold) AS sold 
                 FROM product p JOIN size_product sp ON p.id = sp.id_product 
                 WHERE p.id = ? GROUP BY p.id, p.name`;
    const [results] = await connection.execute(sql, [id]); // Use prepared statement
    return results;
  });
};

export const readSizeProduct = async (id) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT size.vl as size FROM size 
                 JOIN size_product ON size_product.id_size = size.id 
                 JOIN product ON size_product.id_product = product.id 
                 WHERE product.id = ?`;
    const [results] = await connection.execute(sql, [id]); // Use prepared statement
    return results // Extract size values
  });
};

export const readListShoes = async () => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT p.*, SUM(sp.sold) AS sold, SUM(sp.quantity) AS quantity 
                 FROM product p JOIN size_product sp ON p.id = sp.id_product 
                 GROUP BY p.id, p.name`;
    const [results] = await connection.execute(sql); // Use prepared statement
    return results;
  });
};

export const createShoes = async (name, price, imageString, brand, discount, describ) => {
  console.log('trong ', name, price, imageString, brand, discount, describ );
  
  return queryWithConnection(async (connection) => {
    const sql = `INSERT INTO product(name, price, image, brand, discount, describ) VALUES (?, ?, ?, ?, ?, ?)`;
    const [results] = await connection.execute(sql, [name, price, imageString, brand, discount, describ]);
    return results;
  });
};

export const updateShoes = async (id, price, discount, describ) => {
  return queryWithConnection(async (connection) => {
    const sql = `UPDATE product SET price = ?, discount = ?, describ = ? WHERE id = ?`;
    const [results] = await connection.execute(sql, [price, discount, describ, id]);
    return results;
  });
};

export const deleteShoes = async (id) => {
  return queryWithConnection(async (connection) => {
    const sql = `DELETE FROM product WHERE id = ?`;
    const [results] = await connection.execute(sql, [id]);
    return results;
  });
};

export const readListUser = async () => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT * FROM users`;
    const [results] = await connection.execute(sql);
    return results;
  });
};

export const readUser = async (id) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT * FROM users Where id = ?`;
    const [results] = await connection.execute(sql, [id]);
    return results;
  });
};

export const createUser = async (name, email, pass, phoneNumber) => {
  return queryWithConnection(async (connection) => {
    const sql = `INSERT INTO users(name, email, pass, phone_number) VALUES (?, ?, ?, ?)`;
    const [results] = await connection.execute(sql, [name, email, pass, phoneNumber]);
    return results;
  });
};

export const updateUser = async (name, email, phoneNumber, id) => {
  return queryWithConnection(async (connection) => {
    const sql = `UPDATE users SET name = ?, email = ?, phone_number = ? WHERE id = ?`;
    const [results] = await connection.execute(sql, [name, email, phoneNumber, id]);
    return results;
  });
};

export const deleteUser = async (id) => {
  return queryWithConnection(async (connection) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    const [results] = await connection.execute(sql, [id]);
    return results;
  });
};

export const readListShoesByBrand = async (brand) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT * FROM product WHERE brand = ?`;
    const [results] = await connection.execute(sql, [brand]);
    return results;
  });
};

export const readListShoesBySearch = async (key) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT * FROM product WHERE LOWER(name) LIKE CONCAT('%', LOWER(?), '%')`;
    const [results] = await connection.execute(sql, [key]);
    return results;
  });
};

export const logIn = async (phoneNumber, pass) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT id, phone_number, name, pass FROM users WHERE phone_number = ? AND pass = ?`;
    const [results] = await connection.execute(sql, [phoneNumber, pass]);
    return results;
  });
};

export const readIdSize = async (size) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT id FROM size WHERE vl = ?`;
    const [results] = await connection.execute(sql, [size]);
    return results;
  });
};

export const createSizeProduct = async (id_size, id_product, quantity, sold) => {
  return queryWithConnection(async (connection) => {
    const sql = `INSERT INTO size_product (id_size, id_product, quantity, sold) VALUES (?, ?, ?, ?)`;
    const [results] = await connection.execute(sql, [id_size, id_product, quantity, sold]);
    return results;
  });
};


export const checkPhoneNumber = async (phoneNumber) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT * FROM users WHERE phone_number = ?`;
    const [results] = await connection.execute(sql, [phoneNumber]);
    return results;
  });
};

export const readListProductBought = async (id_user) => {
  return queryWithConnection(async (connection) => {
    const sql = `SELECT product.name, orders.order_date, orders.address, orders.phone_number
                 FROM order_item
                 JOIN orders ON order_item.id_order = orders.id
                 JOIN product ON order_item.id_product = product.id
                 WHERE orders.id_user = ?`;
    const [results] = await connection.execute(sql, [id_user]);
    return results;
  });
};

export const readCart = async (id) => {
  return queryWithConnection(async (connection) => {
    const sql = `
      SELECT product.id AS id_product, product.name, product.image, product.discount, product.price, cart_item.quantity, cart_item.id_size, size.vl AS size
      FROM product JOIN cart_item ON cart_item.id_product = product.id
      JOIN size ON cart_item.id_size = size.id
      WHERE cart_item.id_user = ?`;
    const [results] = await connection.execute(sql, [id]);
    return results;
  });
};

export const checkProductInCart = async (id_user, id_product, id_size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
      SELECT product.name, product.price, cart_item.quantity, size.vl
      FROM product JOIN cart_item ON cart_item.id_product = product.id
      JOIN size ON cart_item.id_size = size.id
      WHERE cart_item.id_user = ? AND product.id = ? AND size.id = ?`;
    const [results] = await connection.execute(sql, [id_user, id_product, id_size]);
    return results;
  });
};

export const updateQuantityIntoCart = async (id_user, id_product, quantity, id_size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
      UPDATE cart_item SET quantity = quantity + ?
      WHERE id_user = ? AND id_product = ? AND id_size = ?`;
    const [results] = await connection.execute(sql, [quantity, id_user, id_product, id_size]);
    return results;
  });
};

export const createProductIntoCart = async (id_user, id_product, quantity, id_size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
      INSERT INTO cart_item (id_user, id_product, quantity, id_size) VALUES (?, ?, ?, ?)`;
    const [results] = await connection.execute(sql, [id_user, id_product, quantity, id_size]);
    return results;
  });
};


export const delProductInCart = async (id_user, id_product, id_size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    DELETE FROM cart_item WHERE id_user = ? AND id_product = ? AND id_size = ?;`;
    const [results] = await connection.execute(sql, [id_user, id_product, id_size]);
    return results;
  });
}

export const delCart = async (id_user) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    DELETE FROM cart_item WHERE id_user = ?`;
    const [results] = await connection.execute(sql, [id_user]);
    return results;
  });
}

export const updateProductInCart = async (id_user, id_product, quantity, id_size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE cart_item
        SET quantity = ? 
        WHERE id_user = ? AND id_product = ? AND id_size = ?;`;
    const [results] = await connection.execute(sql, [quantity, id_user, id_product, id_size]);
    return results;
  });
}
export const checkIdSize = async (size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT id from size WHERE vl = ?`;
    const [results] = await connection.execute(sql, [size]);
    console.log(results);
    
    return results;
  });
  
}
export const readQuantity = async (id_product, size) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT quantity, id_size, size.vl as size 
        from size_product 
        JOIN size ON size.id = size_product.id_size 
        WHERE size.vl = ? AND size_product.id_product = ?;`;
    const [results] = await connection.execute(sql,[size, id_product]);
    return results;
  });
}

export const updateQuantity = async (id_product, id_size, quantity) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE size_product
        SET quantity = quantity - ?, sold = sold + ?
        WHERE id_size=? AND id_product=?`;
    const [results] = await connection.execute(sql, [quantity, quantity, id_size, id_product]);
    return results;
  });
}

export const updateSizeQuantity = async (id_product, id_size, quantity) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE size_product
        SET quantity = ?
        WHERE id_size=? AND id_product=?`;
    const [results] = await connection.execute(sql, [quantity, id_size, id_product]);
    return results;
  });
}

export const createOrder = async (id_user, order_date, address, phoneNumber, totalPrice, payment, status) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    INSERT INTO orders (id_user, order_date, address, phone_number, total_price, payment, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [results] = await connection.execute(sql, [id_user, order_date, address, phoneNumber, totalPrice, payment, status]);
    return results;
  });
}

export const createProductInOrder = async (id_order, id_product, id_size, quantity) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    INSERT INTO order_item (id_order, id_product, id_size, quantity) 
        VALUES (?, ?, ?, ?);`;
    const [results] = await connection.execute(sql, [id_order, id_product, id_size, quantity]);
    return results;
  });
}

export const readAllOrder = async () => {
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT * FROM orders`;
    const [results] = await connection.execute(sql);
    return results;
  });
}

export const readOderById = (id_user) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT * FROM orders WHERE id_user = ?`;
    const [results] = await connection.execute(sql, [id_user]);
    return results;
  });
}

export const readProductInOrder = async (id_order) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT product.name ,product.image, size.vl as size, order_item.quantity
    FROM product JOIN order_item ON order_item.id_product= product.id
    JOIN size ON order_item.id_size = size.id
    WHERE order_item.id_order = ?`;
    const [results] = await connection.execute(sql, [id_order]);
    return results;
  });
}

export const updateOrder = async (id_order, address, phoneNumber, status) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE orders
        SET address = ?, phone_number = ?, status = ? 
        WHERE id=?`;
    const [results] = await connection.execute(sql, [address, phoneNumber, status, id_order]);
    return results;
  });
}

export const updateOrderStatus = async (id_order, status) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE orders
        SET status = ? 
        WHERE id=?`;
    const [results] = await connection.execute(sql, [status, id_order]);
    return results;
  });
}

export const delOrder = async (id_order) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    DELETE FROM orders WHERE id = ? `;
    const [results] = await connection.execute(sql, [id_order]);
    return results;
  });
}

export const delProductInOrder = async (id_order) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    DELETE FROM order_item WHERE id_order = ? `;
    const [results] = await connection.execute(sql, [id_order]);
    return results;
  });
}

export const updatePayment = async (id_order) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE orders
        SET payment = online
        WHERE id = ?`;
    const [results] = await connection.execute(sql, [id_order]);
    return results;
  });
}

export const readPass = (id, pass) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT * FROM users u WHERE id = ? ANd pass = ?`;
    const [results] = await connection.execute(sql, [id,pass]);
    return results;
  });
}

export const updatePass = (newPass,id) =>{
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE users
        SET pass = ?
        WHERE id = ?`;
    const [results] = await connection.execute(sql, [newPass,id]);
    return results;
  });
}

export const checkSizeProduct = (id_product,id_size) =>{
  return queryWithConnection(async (connection) => {
    const sql = `
    SELECT * FROM size_product WHERE id_product = ? AND id_size = ?`;
    const [results] = await connection.execute(sql, [id_product,id_size]);
    return results;
  });
}

export const updateToChangeQuantity = (id_product, id_size, quantity) =>{
  return queryWithConnection(async (connection) => {
    const sql = `
    UPDATE size_product
        SET quantity = ?
        WHERE id_product = ? AND id_size = ?`;
    const [results] = await connection.execute(sql, [quantity, id_product, id_size]);
    return results;
  });
}

export const deleteSize = (id_product) => {
  return queryWithConnection(async (connection) => {
    const sql = `
    DELETE FROM size_product
        WHERE id_product = ?`;
    const [results] = await connection.execute(sql, [id_product]);
    return results;
  });
}