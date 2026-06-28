import { Prisma, PrismaClient, RefreshToken } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { IRefreshTokenRepository } from "./IRefreshTokenRepository";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository{

    constructor(private readonly db: PrismaExecutor = prisma) {}

    async findByToken(token: string): Promise<RefreshToken | null> {
        return this.db.refreshToken.findUnique({
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
        return this.db.refreshToken.create({ data: tokenData })
    }

    async deleteByToken(token: string): Promise<void> {
        await this.db.refreshToken.delete({
            where: { token }
        })
    }

    async deleteByUserId(userId: string): Promise<void> {
        await this.db.refreshToken.deleteMany({
            where: { userId }
        })
    }

}