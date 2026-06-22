import { CustomerMapper } from "../mappers/CustomerMapper";
import { ICustomerRepository } from "../repositories/ICustomerRepository";

interface IRequest {
    page: number;
    limit: number;
}

export class ListCustomerService {
    constructor(private readonly repository: ICustomerRepository) {}

    async execute({page, limit}: IRequest) {
        const [customers, total] = await Promise.all([
            this.repository.findMany({page, limit}),
            this.repository.count(),
        ])

        return {
            data: customers.map(customer => CustomerMapper.toResponse(customer)),
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        }
    }
}