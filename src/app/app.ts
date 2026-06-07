import Fastify from "fastify";
import { registerRoutes } from "../shared/routes";
import { errorHandler } from "../shared/errors/error-handler";

export const app = Fastify({
  logger: true
});

export async function buildApp() {
  app.setErrorHandler(errorHandler);

  app.register(registerRoutes);

  await app.ready();

  return app;

}
