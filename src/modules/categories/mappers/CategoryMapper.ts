import { Category } from "@prisma/client";

export class CategoryMapper {
    static toResponse(category: Category) {
        return {
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            
        }
    }
}