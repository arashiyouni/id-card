import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("PICTURES", { schema: "dbo" })
export class Pictures {

  @PrimaryGeneratedColumn({ name: "id"})
  id: string | null;

  @Column("int", { name: "length", nullable: true })
  length: number | null;

  @Column("image", { name: "picture", nullable: true })
  picture: Buffer | null;

  @Column("int", { name: "type", nullable: true })
  type: number | null;

  @Column("datetime", { name: "fecha", nullable: true })
  fecha: Date | null;
}
