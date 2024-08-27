import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("facultad", { schema: "dbo" })
export class Facultad {
  
  @PrimaryGeneratedColumn({ name: "idfacultad"})
  idfacultad: string | null;

  @Column("nvarchar", { name: "nombre", nullable: true, length: 75 })
  nombre: string | null;
}
