import { Customer, Prisma, PrismaClient } from "@prisma/client";
import { CustomerCreateDTO } from "../dtos/CustomerCreateDTO";
import { ICustomerRepository } from "./ICustomerRepository";
import { prisma } from "../../../shared/database/prisma";

type PrismaExecutor = PrismaClient | Prisma.TransactionClient;

export class PrismaCustomerRepository implements ICustomerRepository {

    constructor(private readonly db: PrismaExecutor = prisma) {}

    async create(data: CustomerCreateDTO): Promise<Customer> {
        return this.db.customer.create({ data });
    }

    async findById(id: string): Promise<Customer | null> {
        return this.db.customer.findUnique({ where: { id } });
    }

    async findMany({page, limit}: { page: number, limit: number }): Promise<Customer[]> {
        return this.db.customer.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async count(): Promise<number> {
        return this.db.customer.count();
    }
}