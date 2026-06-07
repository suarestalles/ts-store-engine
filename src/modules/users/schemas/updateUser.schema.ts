import { z } from "zod";
import { Role } from "@prisma/client"

export const updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.email().optional(),
    role: z.enum(Role).optional(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;