const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/productos", productRoutes);


app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});


let server = null;
if (process.env.NODE_ENV !== "test") {
    server = app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = { app, server };