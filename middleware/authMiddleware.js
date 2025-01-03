const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) {
        return res.status(403).json({ message: "Akses ditolak" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token tidak valid" });
    }
};

module.exports = { verifyToken };