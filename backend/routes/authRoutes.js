const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    console.log("📌 Datos recibidos en registro:", req.body); // 🔥 Debug

    try {
        const userExists = await getUserByEmail(email);
        if (userExists) return res.status(400).json({ error: "El usuario ya existe" });

        const newUser = await createUser(nombre, email, password, rol);
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
        console.log("📌 Usuario encontrado en DB:", user); // 🔥 Debug
        if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, rol: user.rol });
    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).json({ error: "Error en el login" });
    }
});


module.exports = router;
