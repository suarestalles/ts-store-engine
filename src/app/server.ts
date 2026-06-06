import { env } from "../shared/config/env";
import { app } from "./app";

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0"
    });

    console.log("Server running");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();