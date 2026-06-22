import { ProductImage } from "@prisma/client";

export class ProductImageMapper {
    static toResponse(productImage: ProductImage) {
        return {
            id: productImage.id,
            url: productImage.url,
            productId: productImage.productId,
            createdAt: productImage.createdAt,
        }
    }
}