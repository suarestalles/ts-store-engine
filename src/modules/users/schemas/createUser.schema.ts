import { z } from "zod"; 

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
    phone: z.string().optional(),
    address: z.string().optional(),
})

export type CreateUserBody = z.infer<typeof createUserSchema>;