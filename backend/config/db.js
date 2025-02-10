const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV === "test") {
    afterAll(async () => {
        await pool.end(); 
    });
}

module.exports = pool;

