import { ICustomerRepository } from "../repositories/ICustomerRepository";
import { AppError } from "../../../shared/errors/AppError";
import { CustomerMapper } from "../mappers/CustomerMapper";

export class FindCustomerByIdService {

    constructor(private readonly customerRepository: ICustomerRepository) {};

    async execute(id: string) {
        const customer = await this.customerRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found", 404);
        }

        return CustomerMapper.toResponse(customer);
    }

}