import { IProductImageRepository } from "../repositories/IProductImageRepository";

export class FindProductImageByProductIdService {

    constructor(private readonly repository: IProductImageRepository) {};

    async execute(productId: string) {
        return await this.repository.findByProductId(productId);
    }
}