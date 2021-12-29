import { ServerRoute } from "@hapi/hapi";

import { sayHello } from "../controllers/helloHandler";

export const helloRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/hello",
    handler: sayHello,
  },
  {
    method: "GET",
    path: "/hello/{name}",
    options: {
      handler: sayHello,
      description: "Says Hello to someone",
      notes: "Dynamic theory of the gravity.",
      tags: ["api"],
    },
  },
];
