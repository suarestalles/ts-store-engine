import { IUserRepository } from "../../users/repositories/IUserRepository";
import { AuthenticateUserDTO } from "../schemas/authenticateUser.schema";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../../shared/config/env";


export class AuthenticateUserService {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: AuthenticateUserDTO) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        
        if (!passwordMatch) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = jwt.sign(
            {
                sub: user.id,
                role: user.role,
            },
            env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        return { token };

    }
}