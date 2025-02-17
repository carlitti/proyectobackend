const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const createUser = async (nombre, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
        [nombre, email, hashedPassword]
    );
    return result.rows[0];
};


const getUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return result.rows[0];
};

module.exports = { createUser, getUserByEmail };
