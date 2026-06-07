import { RefreshToken } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { IRefreshTokenRepository } from "./IRefreshTokenRepository";

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository{

    async findByToken(token: string): Promise<RefreshToken | null> {
        return prisma.refreshToken.findUnique({
            where: { token }
        })
    }

    async create(tokenData: {
        token: string;
        userId: string;
        expiresAt: Date;
        deviceName?: string;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<RefreshToken> {
        return prisma.refreshToken.create({ data: tokenData })
    }

    async deleteByToken(token: string): Promise<void> {
        await prisma.refreshToken.delete({
            where: { token }
        })
    }

    async deleteByUserId(userId: string): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: { userId }
        })
    }

}