import Hapi from "@hapi/hapi";
import { Server, ServerRegisterPluginObject } from "@hapi/hapi";
import { helloRoutes } from "./views/helloView";
import { peopleRoutes } from "./views/personView";
import hapiVision from "@hapi/vision";
import hapiSwagger from "hapi-swagger";
import hapiPino from "hapi-pino";
import Inert from "@hapi/inert";
import { get } from "node-emoji";
import "colors";
// import { initDatabaseConnection } from "./database";
// import { fakerUsers } from "./database/fakingData";
// import { create } from "./database/service";
// import { UserEntity } from "./database/entity";

export let server: Server;
export const init = async function (): Promise<Server> {
  server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  // Routes will go here
  server.route(helloRoutes);
  server.route(peopleRoutes);

  await registerVision(server);
  await registerSwagger(server);
  await registerMonitor(server);
  await registerPino(server);

  return server;
};

export const start = async function (): Promise<void> {
  const rocket = get("rocket");

  console.log(
    rocket,
    `Listening on ${server.settings.host}:${server.settings.port}`.green,
    rocket
  );

  // const connect = await initDatabaseConnection();
  // await fakerUsers(connect);

  return server.start();
};

async function registerVision(server: Server) {
  let cached: boolean;

  await server.register(hapiVision);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    cached = false;
  } else {
    cached = true;
  }

  server.log(["debug"], `Caching templates:${cached}`);
  server.views({
    engines: {
      ejs: require("ejs"),
    },
    relativeTo: __dirname + "/../",
    path: "templates",
    isCached: cached,
  });
}

async function registerSwagger(server: Server) {
  const swaggerOptions: hapiSwagger.RegisterOptions = {
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  };

  const plugins: ServerRegisterPluginObject<any>[] = [
    {
      plugin: Inert,
    },
    {
      plugin: hapiSwagger,
      options: swaggerOptions,
    },
  ];

  await server.register(plugins);
}

async function registerMonitor(server: Server) {
  await server.register({
    plugin: require("hapijs-status-monitor"),
    options: {
      title: "Midsiberia 1908 Monitor",
    },
  });
}

async function registerPino(server: Server) {
  await server.register({
    plugin: hapiPino,
    options: {
      // prettyPrint: process.env.NODE_ENV !== "production",
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ["req.headers.authorization"],
    },
  });
}

process.on("unhandledRejection", (err) => {
  console.error("unhandleRejection");
  console.error(err);
  process.exit(1);
});
