import { AppError } from "../../../shared/errors/AppError";
import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";

type LogoutRequest = {
    userId: string;
    refreshToken?: string;
}

export class LogoutService {
    constructor(private readonly refreshTokenRepository: IRefreshTokenRepository) {}

    async execute({ userId, refreshToken }: LogoutRequest) {
        if (refreshToken) {
            const tokenExists = await this.refreshTokenRepository.findByToken(refreshToken);
            if (!tokenExists) throw new AppError("Refresh token not found", 401);

            await this.refreshTokenRepository.deleteByToken(refreshToken);
            return { message: "Logged out from current session" };
        } else {
            await this.refreshTokenRepository.deleteByUserId(userId);
            return { message: "Logged out from all sessions" };
        }
    }
}