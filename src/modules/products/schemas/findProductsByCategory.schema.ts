import z from "zod";

export const findProductsByCategorySchema = z.object({
    categoryId: z.uuid(),
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
});

export type FindProductByCategorySchema = z.infer<typeof findProductsByCategorySchema>;