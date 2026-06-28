import { IUserRepository } from "../../users/repositories/IUserRepository";
import { AuthenticateUserDTO } from "../schemas/authenticateUser.schema";
import { AppError } from "../../../shared/errors/AppError";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../strategies/generateAccessToken";
import { generateRefreshToken } from "../strategies/generateRefreshToken";
import { prisma } from "../../../shared/database/prisma";
import { addDays } from "date-fns";
import { IRefreshTokenRepository } from "../repositories/IRefreshTokenRepository";


export class AuthenticateUserService {
    constructor(
        private readonly authRepository: IRefreshTokenRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(data: AuthenticateUserDTO) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        
        if (!passwordMatch) {
            throw new AppError("Invalid credentials", 401);
        }

        const accessToken = generateAccessToken({ id: user.id, role: user.role })
        const refreshToken = generateRefreshToken(user.id)
        
        const refreshed = await this.authRepository.findByToken(refreshToken);

        if (refreshed) {
            throw new AppError("Refresh Token already exists", 409)
        }

        await prisma.$transaction(async (tx) => {
            await this.authRepository.create({
                token: refreshToken,
                userId: user.id,
                expiresAt: addDays(new Date(), 7),
            })
        })

        return { accessToken, refreshToken, user };

    }
}