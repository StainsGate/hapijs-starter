import { name, internet, date, random } from "faker";
import { Connection, Repository } from "typeorm";
import { UserEntity, UserType } from "../entity";
import { genSalt, hash } from "bcrypt";
import "colors";
import { get } from "node-emoji";

export const fakerUsers = async (con: Connection, amount: number = 60) => {
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);

  for (const _ of Array.from({ length: amount })) {
    const nick_name = name.findName();
    const birthDate = date.past();
    const email = internet.email();
    const type: UserType = random.arrayElement(["normal", "admin"]);
    const salt = await genSalt();
    const password = await hash("secret", salt);
    const u = new UserEntity(nick_name, birthDate, email, type, password, salt);
    await userRepo.save(u);
  }
  const emoji = get("white_check_mark");
  console.log(emoji, `Created ${amount} users`.magenta.bold, emoji);
};
