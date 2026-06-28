import z from "zod";

export const updateProductSchema = z.object({
    name: z.string().optional(),
    categoryId: z.uuid().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
})

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;