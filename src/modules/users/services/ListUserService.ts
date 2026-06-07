import { IUserRepository } from "../repositories/IUserRepository";
import { UserMapper } from "../mappers/UserMapper";

interface IRequest {
    page: number;
    limit: number;
}

export class ListUserService {
    constructor(private readonly userRepository: IUserRepository) {};

    async execute({page, limit}: IRequest) {
        const [users, total] = await Promise.all([
            this.userRepository.findMany({ page, limit }),
            this.userRepository.count(),
        ])
        
        return {
            data: users.map(user => UserMapper.toResponse(user) ),
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        }
    }
}