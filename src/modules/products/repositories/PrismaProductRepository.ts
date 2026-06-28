import { Product } from "@prisma/client";
import { ProductCreateDTO } from "../dtos/ProductCreateDTO";
import { IProductRepository } from "./IProductRepository";
import { prisma } from "../../../shared/database/prisma";
import { ProductUpdateDTO } from "../dtos/productUpdateDTO";
import { ProductWithRelations } from "../mappers/ProductMapper";

export class PrismaProductRepository implements IProductRepository {

    async create(data: ProductCreateDTO): Promise<Product> {
        return prisma.product.create({ data });
    };

    async update(id: string, data: ProductUpdateDTO): Promise<ProductWithRelations> {
        return prisma.product.update({
            where: { id },
            include: {
                category: true,
                images: true,
            },
            data
        });
    };

    async findById(id: string): Promise<ProductWithRelations | null> {
        return prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                images: true,
            },
        });
    };

    async findMany({ page, limit }: { page: number, limit: number }): Promise<ProductWithRelations[]> {
        return prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                category: true,
                images: true,
            },
            orderBy: {
                createdAt: "desc"
            },
        });
    };

    async findByCategory({ categoryId, page, limit }: { categoryId: string, page: number, limit: number }): Promise<ProductWithRelations[]> {
        return prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: { categoryId },
            include: {
                category: true,
                images: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    };

    async delete(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id }
        });
    }

    async count(): Promise<number> {
        return prisma.product.count();
    }

    async countByCategory({ categoryId, page, limit }: { categoryId: string, page: number, limit: number }): Promise<number> {
        const products = await prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: { categoryId },
            orderBy: { createdAt: "desc" }
        })

        return products.length;
    }
}