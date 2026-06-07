import { Role } from "@prisma/client"

export interface UserUpdateDTO {
    name?: string;
    email?: string;
    role?: Role;
}