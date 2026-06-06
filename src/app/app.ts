import Fastify from "fastify";
import { registerRoutes } from "../shared/routes";
import { errorHandler } from "../shared/errors/error-handler";

export const app = Fastify({
  logger: true
});

app.setErrorHandler(errorHandler);

app.register(registerRoutes);