import { AppError } from "../../../shared/errors/AppError";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class DeleteCategoryService {

    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async execute(id: string) {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new AppError("Category not found", 404)
        }

        await this.categoryRepository.delete(id);

        return;
    }

}