import { Column, Entity } from "typeorm";

@Entity("PicturesHistorial", { schema: "dbo" })
export class PicturesHistorial {
  @Column("bigint", { name: "IdPicture", nullable: true })
  idPicture: string | null;

  @Column("varchar", { name: "id", nullable: true, length: 8 })
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
