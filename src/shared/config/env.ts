// src/shared/config/env.ts

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(3333),

  JWT_SECRET: z.string().min(32),

  DATABASE_URL: z.string().startsWith("postgresql://")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables",
    parsedEnv.error.format()
  );

  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;