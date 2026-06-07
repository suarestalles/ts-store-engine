import { z } from "zod";

export const listUsersSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
});

export type ListUserSchema = z.infer<typeof listUsersSchema>;