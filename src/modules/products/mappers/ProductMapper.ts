import { Prisma } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: {
        category: true,
        images: true,
    }
}>

export class ProductMapper {
    static toResponse(product: ProductWithRelations) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            category: product.category,
            images: product.images.map(image => image.url)
        }
    }
}