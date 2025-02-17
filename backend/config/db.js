const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // 🔥 Necesario para Railway
});


if (process.env.NODE_ENV === "test") {
    afterAll(async () => {
        await pool.end(); 
    });
}

pool.connect()
    .then(() => console.log("📦 Conectado a la base de datos PostgreSQL"))
    .catch(err => console.error("❌ Error de conexión a la base de datos", err));

module.exports = pool;

module.exports = pool;

