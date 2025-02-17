const express = require("express");
const { createProducto, getProductos, getProductById } = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await getProductById(id); // 🔥 Ahora está definido
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        res.json(producto);
    } catch (error) {
        console.error("❌ Error al obtener producto:", error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
});

router.get("/", async (req, res) => {
    try {
        const productos = await getProductos();
        res.json(productos);
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    console.log("📌 Usuario autenticado:", req.user);
    try {
        const { titulo, descripcion, precio, imagen_url } = req.body;
        const id_vendedor = req.user.id; // Obtenemos el usuario autenticado

        // ❌ Eliminamos la verificación de "vendedor" porque ya no hay roles.
        const producto = await createProducto(titulo, descripcion, precio, imagen_url, id_vendedor);
        res.status(201).json({ message: "Producto agregado", producto });
    } catch (error) {
        console.error("❌ Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
});




module.exports = router;
