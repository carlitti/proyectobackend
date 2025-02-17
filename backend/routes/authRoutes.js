const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
    let { nombre, email, password } = req.body; // 👈 Eliminamos "rol"

    try {
        const userExists = await getUserByEmail(email);
        if (userExists) return res.status(400).json({ error: "El usuario ya existe" });

        // ✅ Eliminamos "rol" porque ya no se usa
        const newUser = await createUser(nombre, email, password);
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ error: "Error en el registro" });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        console.log("📌 Usuario encontrado en DB:", user);
        if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

        // ✅ Eliminar "rol" del token porque ya no se usa
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, nombre: user.nombre });
    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ error: "Error en el login" });
    }
});

module.exports = router;
