import {
  Request,
  ResponseToolkit,
  ResponseObject,
  ServerRoute,
} from "@hapi/hapi";

export async function sayHello(
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> {
  const name: string = request.params.name || "world";

  const response = h.response("hello " + name);

  response.header("X-Custom", "midsiberia1908");

  return response;
}
