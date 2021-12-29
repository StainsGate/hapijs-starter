import "reflect-metadata";
import { Connection, createConnection, ConnectionOptions } from "typeorm";
import { UserEntity } from "./entity/users.entity";
import * as dotenv from "dotenv";

dotenv.config();

export async function initDatabaseConnection(): Promise<Connection> {
  const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity],
    logger: "advanced-console",
    logging: ["error"],
  };

  const con = await createConnection(config);
  await con.synchronize(true);
  return con;
}
