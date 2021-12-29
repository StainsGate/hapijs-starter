import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { sharedProps } from "./sharedProps.entity";

export type UserType = "normal" | "admin";

@Entity({ name: "users" })
export class UserEntity extends sharedProps {
  constructor(
    name: string,
    birthDate: Date,
    email: string,
    type: UserType,
    password: string,
    salt: string
  ) {
    super();
    this.name = name;
    this.birthDate = birthDate;
    this.email = email;
    this.type = type;
    this.password = password;
    this.salt = salt;
  }

  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ name: "username", nullable: false })
  name: string;

  @Column({ name: "birth_date", nullable: true, type: "date" })
  birthDate: Date;

  @Column({ name: "email", nullable: false })
  email: string;

  @Column({ default: "normal" })
  type: UserType;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  accessToken?: string;
}
