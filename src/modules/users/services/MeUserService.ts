import { AppError } from "../../../shared/errors/AppError";
import { CustomerMapper } from "../../customers/mappers/CustomerMapper";
import { ICustomerRepository } from "../../customers/repositories/ICustomerRepository";

export class MeUserService {
    constructor(private readonly repository: ICustomerRepository) {}

    async execute(id: string) {
        const me = await this.repository.findByUserId(id)

        if (!me) {
            throw new AppError("User data not found", 404)
        }

        return CustomerMapper.toResponse(me)
    }
}