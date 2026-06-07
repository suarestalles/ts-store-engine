import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { env } from "../../../shared/config/env";

export function generateAccessToken(user: {
    id: string,
    role: Role,
}) {
    return jwt.sign(
        {
            role: user.role,
        },
        env.JWT_ACCESS_SECRET,
        {
            subject: user.id,
            expiresIn: "15m"
        }
    )
}