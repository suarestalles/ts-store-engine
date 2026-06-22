import { Customer } from "@prisma/client";
import { CustomerCreateDTO } from "../dtos/CustomerCreateDTO";
import { ICustomerRepository } from "./ICustomerRepository";
import { prisma } from "../../../shared/database/prisma";

export class PrismaCustomerRepository implements ICustomerRepository {

    async create(data: CustomerCreateDTO): Promise<Customer> {
        return prisma.customer.create({ data });
    }

    async findById(id: string): Promise<Customer | null> {
        return prisma.customer.findUnique({ where: { id } });
    }

    async findMany({page, limit}: { page: number, limit: number }): Promise<Customer[]> {
        return prisma.customer.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async count(): Promise<number> {
        return prisma.customer.count();
    }
}