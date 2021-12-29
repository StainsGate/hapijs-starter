import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { UserEntity } from "../src/database/entity";
import * as userService from "../src/database/service";
import * as DB from "../src/database/";

const add = {
  addUser: (name: string) => {
    console.log("addUser", name);
  },
};

function addUser(name: string) {
  console.log("addUser", name);
}

describe.only("Test user service", async () => {
  it("should create user", async () => {
    const user = new UserEntity(
      "John",
      new Date("1998-12-21"),
      "12345@qq.com",
      "admin",
      "password",
      "what"
    );
    // const mock = Sinon.stub(DB, "initDatabaseConnection");
    // const spy = Sinon.fake(create);
    // Sinon.replace(null,"create",Sinon.fake.resolves("sinon"))
    // const spy = Sinon.spy(DB, "initDatabaseConnection");
    // const spy = Sinon.expectation.create("create");
    const spy = Sinon.stub(userService, "create");
    // Sinon.replace(userService, "create", spy);
    // spy("haha");
    // add.addUser("123");
    // test.add("hhh");
    // const val = await userService.create(user);
    await userService.create(user);
    // const val = await userService.create(user);
    // expect(val).to.equal("create");
    expect(spy.calledOnce).to.be.true;
    // expect(spy.calledWith("hhh")).to.be.true;
  });
});
