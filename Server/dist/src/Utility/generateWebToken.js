import jwt from "jsonwebtoken"; // Importando SignOptions
// Função para gerar o token JWT
export const generateToken = (email, username, userId) => {
    const payload = { email, username, userId }; // Agora com a tipagem explícita do payload
    const secretKey = process.env.JWT_SECRET; // Usando chave secreta do ambiente
    if (!secretKey) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return null; // Não precisamos responder aqui, pois é uma função utilitária
    }
    const signOptions = {
        expiresIn: process.env.JWT_EXPIRES_IN
            ? parseInt(process.env.JWT_EXPIRES_IN)
            : 3600,
    };
    // Gerando o token
    const token = jwt.sign(payload, secretKey, signOptions);
    return token;
};
