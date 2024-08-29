import { Column, Entity } from "typeorm";

@Entity("facultad", { schema: "dbo" })
export class Facultad {
  @Column("nvarchar", { name: "idfacultad", nullable: true, length: 2 })
  idfacultad: string | null;

  @Column("nvarchar", { name: "nombre", nullable: true, length: 75 })
  nombre: string | null;
}
