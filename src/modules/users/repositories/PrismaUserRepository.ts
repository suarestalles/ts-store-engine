import { IUserRepository } from "./IUserRepository";
import { UserCreateDTO } from "../dtos/UserCreateDTO";
import { User } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";
import { UserUpdateDTO } from "../dtos/UserUpdateDTO";

export class PrismaUserRepository implements IUserRepository {

    async create(data: UserCreateDTO): Promise<User> {
        return prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    async findMany({page, limit}: { page: number; limit: number }) {
        return prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async count() {
        return prisma.user.count();
    }

    async update(id: string, data: UserUpdateDTO): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        })
    }

}