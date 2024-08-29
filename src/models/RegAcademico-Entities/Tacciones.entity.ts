import { Column, Entity } from "typeorm";

@Entity("tacciones", { schema: "dbo" })
export class Tacciones {
  @Column("smallint", { name: "idaccion", nullable: true })
  idaccion: number | null;

  @Column("nvarchar", { name: "nombrea", nullable: true, length: 50 })
  nombrea: string | null;
}
