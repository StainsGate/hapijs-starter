import { ServerRoute } from "@hapi/hapi";

import {
  showPeople,
  addPersonGet,
  addPersonPost,
} from "../controllers/personHandler";

export const peopleRoutes: ServerRoute[] = [
  { method: "GET", path: "/people", handler: showPeople },
  { method: "GET", path: "/people/add", handler: addPersonGet },
  { method: "POST", path: "/people/add", handler: addPersonPost },
];
