const express = require("express");
const { createProducto, getProductos } = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const productos = await getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});


router.post("/", authMiddleware, async (req, res) => {
    console.log("📌 Usuario autenticado:", req.user); // 🔥 Debug
    try {
        const { titulo, descripcion, precio, imagen_url } = req.body;
        const id_vendedor = req.user.id;

        if (req.user.rol !== "vendedor") {
            return res.status(403).json({ error: "Solo los vendedores pueden crear productos" });
        }

        const producto = await createProducto(titulo, descripcion, precio, imagen_url, id_vendedor);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
});



module.exports = router;
