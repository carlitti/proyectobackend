const pool = require("../config/db");

const createProducto = async (titulo, descripcion, precio, imagen_url, id_vendedor) => {
    const result = await pool.query(
        "INSERT INTO productos (titulo, descripcion, precio, imagen_url, id_vendedor) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [titulo, descripcion, precio, imagen_url, id_vendedor]
    );
    return result.rows[0];
};

const getProductos = async () => {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
};

module.exports = { createProducto, getProductos };
