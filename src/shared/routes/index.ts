import { FastifyInstance } from "fastify";
import { userRoutes } from "../../modules/users/routes/user.routes";
import { authRoutes } from "../../modules/auth/routes/auth.routes";

export async function registerRoutes(app: FastifyInstance) {
  
  app.register(userRoutes)
  app.register(authRoutes)
  
}