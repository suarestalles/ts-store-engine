import { Category } from "@prisma/client";
import { CategoryCreateDTO } from "../dtos/CategoryCreateDTO";
import { ICategoryRepository } from "./ICategoryRepository";
import { prisma } from "../../../shared/database/prisma";
import { CategoryUpdateDTO } from "../dtos/CategoryUpdateDTO";

export class PrismaCategoryRepository implements ICategoryRepository {
    
    async create(data: CategoryCreateDTO): Promise<Category> {
        return prisma.category.create({ data });
    }

    async update(id: string, data: CategoryUpdateDTO): Promise<Category> {
        return prisma.category.update({
            where: { id },
            data
        });
    }

    async findById(id: string): Promise<Category | null> {
        return prisma.category.findUnique({
            where: { id }
        })
    }

    async findMany({ page, limit }: { page: number, limit: number }) {
        return prisma.category.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async count() {
        return prisma.category.count();
    }

    async delete(id: string): Promise<void> {
        await prisma.category.delete({
            where: { id }
        })
    }
}