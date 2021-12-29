import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export class sharedProps {
  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
    name: "create_at",
  })
  createAt: Date;

  @UpdateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
    name: "update_at",
  })
  updateAt: Date;
}
