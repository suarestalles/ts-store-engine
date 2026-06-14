import { env } from "../shared/config/env";
import { buildApp } from "./app";

const start = async () => {
  try {

    const app = await buildApp();
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0"
    });

    console.log("Server running");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();