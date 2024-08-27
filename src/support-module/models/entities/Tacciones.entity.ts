import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tacciones", { schema: "dbo" })
export class Tacciones {

  @PrimaryGeneratedColumn({ name: "idaccion"})
  idaccion: number | null;

  @Column("nvarchar", { name: "nombrea", nullable: true, length: 50 })
  nombrea: string | null;
}
