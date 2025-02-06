import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  email: string;
  username: string;
  userId: string;
}

export const generateToken = (
  email: string,
  username: string,
  userId: string
): string | null => {
  const payload: TokenPayload = { email, username, userId };
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error("JWT_SECRET is not defined in environment variables.");
    return null;
  }

  const signOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN
      ? parseInt(process.env.JWT_EXPIRES_IN)
      : 36000,
  };

  const token = jwt.sign(payload, secretKey as string, signOptions);

  return token;
};
