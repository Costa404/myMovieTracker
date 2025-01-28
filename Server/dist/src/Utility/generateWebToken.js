import jwt from "jsonwebtoken";
export const generateToken = (email, username, userId) => {
    const payload = { email, username, userId };
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return null;
    }
    const signOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN
            ? parseInt(process.env.JWT_EXPIRES_IN)
            : 3600,
    };
    const token = jwt.sign(payload, secretKey, signOptions);
    return token;
};
