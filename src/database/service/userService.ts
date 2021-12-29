import { Connection, Repository } from "typeorm";
import { UserEntity } from "../entity";
import { initDatabaseConnection } from "../connection";

export const create = async (user: UserEntity) => {
  console.log("create");
  const con: Connection = await initDatabaseConnection();
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);
  await userRepo.insert(user);
};
