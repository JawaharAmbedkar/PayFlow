const  JWT_SECRET  = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Missing or invalid authorization header");
        return res.status(403).json({ message: "Forbidden" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Payload:", decoded);

        if (decoded.userId) {
            req.userId = decoded.userId; // Assign userId to req.userId
            console.log("User ID set in req:", req.userId);
            next();
        } else {
            console.log("userId not found in decoded payload");
            return res.status(403).json({ message: "Forbidden2" });
        }
    } catch (err) {
        console.log("Error verifying token:", err);  // Log the error
        return res.status(403).json({ message: "Forbidden3", error: err.message });  // Return the error message
    }
};

module.exports = {
    authMiddleware
};
