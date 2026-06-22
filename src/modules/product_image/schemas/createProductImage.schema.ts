import { z } from "zod";

export const createProductImageSchema = z.object({
    url: z.url().or(z.string().min(1)),
    productId: z.uuid(),
})

export type CreateProductImageSchema = z.infer<typeof createProductImageSchema>;