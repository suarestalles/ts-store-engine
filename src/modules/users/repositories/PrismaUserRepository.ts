import { IUserRepository } from "./IUserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "@prisma/client";
import { prisma } from "../../../shared/database/prisma";

export class PrismaUserRepository implements IUserRepository {

    async create(data: CreateUserDTO): Promise<User> {
        return prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

}