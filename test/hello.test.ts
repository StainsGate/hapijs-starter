import { Server } from "@hapi/hapi";
import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { init } from "../src/server";

describe("server greets people", async () => {
  let server: Server;

  beforeEach((done) => {
    init().then((s) => {
      server = s;
      done();
    });
  });

  afterEach((done) => {
    server.stop().then(() => {
      done();
    });
  });

  it("should says hello world", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/hello",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal("hello world");
  });

  it("should say hello to person", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/hello/osamu",
    });

    expect(res.statusCode).to.equal(200);
    expect(res.result).to.equal("hello osamu");
  });
});
