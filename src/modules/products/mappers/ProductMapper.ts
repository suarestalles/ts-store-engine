import { Product } from "@prisma/client";

export class ProductMapper {
    static toResponse(product: Product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            categoryId: product.categoryId,
        }
    }
}