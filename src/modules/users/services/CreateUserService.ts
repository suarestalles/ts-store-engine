import { IUserRepository } from "../repositories/IUserRepository";
import { UserCreateDTO }  from "../dtos/UserCreateDTO";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcrypt";
import { createCustomerSchema } from "../../customers/schemas/createCustomer.schema";
import { prisma } from "../../../shared/database/prisma";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { PrismaCustomerRepository } from "../../customers/repositories/PrismaCustomerRepository";
import { createUserSchema } from "../schemas/createUser.schema";

export class CreateUserService {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(data: UserCreateDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new AppError("Email already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const customerData = createCustomerSchema.parse({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            totalOrders: 0,
            totalSpent: 0,
        });

        
        const result = await prisma.$transaction(async (tx) => {
            const userRepo = new PrismaUserRepository(tx);
            const customerRepo = new PrismaCustomerRepository(tx);
            
            const user = await userRepo.create(createUserSchema.parse({
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }));

            await customerRepo.create({...customerData, userId: user.id});
            
            return user;
        })

        return result;
    }

}