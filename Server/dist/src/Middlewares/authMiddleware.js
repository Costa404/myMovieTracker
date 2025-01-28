import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.warn("Access denied: Missing token");
        return res.status(401).json({ error: "Access denied, token missing" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("Critical error: JWT_SECRET is not defined!");
        return res.status(500).json({ error: "Internal server error" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
        };
        console.log("Token verified successfully:", req.user);
        next();
    }
    catch (error) {
        const err = error;
        console.warn("Invalid or expired token:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
