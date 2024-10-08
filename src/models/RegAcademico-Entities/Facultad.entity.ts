import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("facultad", { schema: "dbo" })
export class Facultad {
  @PrimaryColumn({name: "idfacultad",type:"nvarchar" })
  idfacultad: string | null;

  @Column("nvarchar", { name: "nombre", nullable: true, length: 75 })
  nombre: string | null;
}
