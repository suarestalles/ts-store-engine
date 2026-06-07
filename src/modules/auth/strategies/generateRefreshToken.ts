import jwt from "jsonwebtoken";
import { env } from "../../../shared/config/env";

export function generateRefreshToken(userId: string) {
    return jwt.sign(
        {},
        env.JWT_REFRESH_SECRET,
        {
            subject: userId,
            expiresIn: "7d",
        }
    )
}