import z from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3),
    categoryId: z.uuid(),
    price: z.number(),
    description: z.string().min(5),
    images: [z.string().optional()],
})

export type CreateProductSchema = z.infer<typeof createProductSchema>;