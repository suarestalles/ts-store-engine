import { CategoryMapper } from "../mappers/CategoryMapper";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

interface IRequest {
    page: number;
    limit: number;
}

export class ListCategoryService {

    constructor(private readonly categoryRepository: ICategoryRepository) {};

    async execute({page, limit}: IRequest) {
        const [categories, total] = await Promise.all([
            this.categoryRepository.findMany({ page, limit }),
            this.categoryRepository.count(),
        ]);

        return {
            data: categories.map(category => CategoryMapper.toResponse(category)),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        }
    }

}