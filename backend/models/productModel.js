const pool = require("../config/db");

const createProducto = async (titulo, descripcion, precio, imagen_url, id_vendedor) => {
    const result = await pool.query(
        "INSERT INTO productos (titulo, descripcion, precio, imagen_url, id_vendedor) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [titulo, descripcion, precio, imagen_url, id_vendedor]
    );
    return result.rows[0];
};

// ✅ Añade esta función antes de exportar
const getProductos = async () => {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    return result.rows[0]; // Devuelve el primer producto encontrado o undefined si no existe
};

module.exports = { createProducto, getProductos, getProductById }; // 🔥 Agregar getProductById aquí
