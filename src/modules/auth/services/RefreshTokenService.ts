import { AppError } from "../../../shared/errors/AppError";
import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";
import { generateAccessToken } from "../strategies/generateAccessToken";
import jwt from "jsonwebtoken";
import { env } from "../../../shared/config/env";
import { Role } from "@prisma/client";

type Request = {
    refreshToken: string;
}

export class RefreshTokenService {
    constructor(
        private readonly refreshTokenRepository: IRefreshTokenRepository,
    ) {};

    async execute({ refreshToken }: Request) {
        const storedToken = await this.refreshTokenRepository.findByToken(refreshToken);

        if (!storedToken) {
            throw new AppError("Invalid refresh token")
        }

        if (storedToken.expiresAt < new Date()) {
            throw new AppError("Refresh token expired", 401);
        }

        const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as { sub: string };

        const accessToken = generateAccessToken({
            id: payload.sub,
            role: Role.USER,
        })

        return { accessToken }

        
    }

}