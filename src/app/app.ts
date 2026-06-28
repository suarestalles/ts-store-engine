import Fastify from "fastify";
import { registerRoutes } from "../shared/routes";
import { errorHandler } from "../shared/errors/error-handler";
import { registerCors } from "../shared/config/cors";
import { registerCookies } from "../shared/config/cookies";

export const app = Fastify({
  logger: true
});

export async function buildApp() {
  app.setErrorHandler(errorHandler);

  await registerCors(app);
  await registerCookies(app);

  app.register(registerRoutes);

  await app.ready();

  return app;

}
