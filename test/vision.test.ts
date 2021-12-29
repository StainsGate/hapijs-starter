import { Server } from "@hapi/hapi";
import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import { parse } from "node-html-parser";
import { init } from "../src/server";

const personData = { name: "Sherlock Holmes", age: 32 };

describe("Vision templates test", async () => {
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

  it("should see  exisiting people ", async () => {
    const res = await server.inject({
      method: "GET",
      url: "/people",
    });

    expect(res.statusCode).to.equal(200);
    expect(res.payload).to.not.be.null;
    const html = parse(res.payload);
    const people = html.querySelectorAll("li.person-entry");
    expect(people.length).to.equal(2);
  });

  it("can add a person and they show in the list", async () => {
    let res = await server.inject({
      method: "post",
      url: "/people/add",
      payload: personData,
    });
    expect(res.statusCode).to.equal(302);
    expect(res.headers.location).to.equal("/people");

    res = await server.inject({
      method: "get",
      url: "/people",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.payload).to.not.be.null;
    const html = parse(res.payload);
    const people = html.querySelectorAll("li.person-entry");
    expect(people.length).to.equal(3);
  });

  describe("server handles people - negative tests", async () => {
    let server: Server;

    beforeEach(async () => {
      server = await init();
    });
    afterEach(async () => {
      await server.stop();
    });

    it("can't add a person with no name", async () => {
      let res = await server.inject({
        method: "post",
        url: "/people/add",
        payload: { ...personData, name: null },
      });
      expect(res.statusCode).to.equal(200);
    });

    it("can't add a person with no age", async () => {
      let res = await server.inject({
        method: "post",
        url: "/people/add",
        payload: { ...personData, age: null },
      });
      expect(res.statusCode).to.equal(200);
    });

    it("can't add a person with non-number age", async () => {
      let res = await server.inject({
        method: "post",
        url: "/people/add",
        payload: { ...personData, age: "Watson" },
      });
      expect(res.statusCode).to.equal(200);
    });
  });
});
