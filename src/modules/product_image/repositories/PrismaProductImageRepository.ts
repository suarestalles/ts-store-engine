import { ProductImage } from "@prisma/client";
import { IProductImageRepository } from "./IProductImageRepository";
import { prisma } from "../../../shared/database/prisma";
import { ProductImageCreateDTO } from "../dtos/ProductImageCreateDTO";

export class PrismaProductImageRepository implements IProductImageRepository {

    async create(data: ProductImageCreateDTO): Promise<ProductImage> {
        return prisma.productImage.create({ data });
    }

    async delete(id: string): Promise<void> {
        await prisma.productImage.delete({
            where: { id }
        })
    }

    async findById(id: string): Promise<ProductImage | null> {
        return prisma.productImage.findUnique({
            where: { id }
        })
    }

    async findByProductId(productId: string): Promise<ProductImage[]> {
        return prisma.productImage.findMany({
            where: { productId }
        })
    }
}