import { IUserRepository } from "./IUserRepository";
import { UserCreateDTO } from "../dtos/UserCreateDTO";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { UserUpdateDTO } from "../dtos/UserUpdateDTO";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class PrismaUserRepository implements IUserRepository {

    constructor(private readonly db: PrismaExecutor = prisma) {}

    async create(data: UserCreateDTO): Promise<User> {
        return this.db.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { id },
        });
    }

    async findMany({page, limit}: { page: number; limit: number }) {
        return this.db.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async count() {
        return this.db.user.count();
    }

    async update(id: string, data: UserUpdateDTO): Promise<User> {
        return this.db.user.update({
            where: { id },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        await this.db.user.delete({
            where: { id }
        })
    }

}