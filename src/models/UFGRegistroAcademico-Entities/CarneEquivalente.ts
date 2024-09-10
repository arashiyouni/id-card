import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("CarneEquivalente", { schema: "dbo" })
export class CarneEquivalente {
  @PrimaryColumn({ name: "IdCarnetEquivalete"})
  // @Column("varchar", { name: "IdCarnetEquivalete", length: 10 })
  idCarnetEquivalete: string;

  @Column("varchar", { name: "Carnet", length: 8 })
  carnet: string;

  @Column("varchar", { name: "CarnetEquivalente", length: 10 })
  carnetEquivalente: string;

  @Column("datetime", { name: "FechaCarnetEquivalente", nullable: true })
  fechaCarnetEquivalente: Date | null;

  @Column("smallint", { name: "IdUsuarioCarneEquivalente" })
  idUsuarioCarneEquivalente: number;
}
