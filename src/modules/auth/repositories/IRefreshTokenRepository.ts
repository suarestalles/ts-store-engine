import { RefreshToken } from "@prisma/client";

export interface IRefreshTokenRepository {

    findByToken(token: string): Promise<RefreshToken | null>;

    create(tokenData: {
        token: string;
        userId: string;
        expiresAt: Date;
        deviceName?: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<RefreshToken>;

    deleteByToken(token: string): Promise<void>;

    deleteByUserId(userId: string): Promise<void>;
    
}