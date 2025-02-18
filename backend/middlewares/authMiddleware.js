const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "Acceso denegado, token no proporcionado" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Acceso denegado, token inválido" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("📌 Usuario autenticado:", req.user); // ✅ Verificar si llega el ID
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido" });
    }
};

module.exports = authenticateToken;

