import { Column, Entity } from "typeorm";

@Entity("CicloEG", { schema: "dbo" })
export class CicloEg {
  @Column("int", { name: "IdCicloEG", nullable: true })
  idCicloEg: number | null;

  @Column("char", { name: "Nombre", nullable: true, length: 7 })
  nombre: string | null;

  @Column("datetime", { name: "FechaInicio", nullable: true })
  fechaInicio: Date | null;

  @Column("datetime", { name: "FechaFin", nullable: true })
  fechaFin: Date | null;

  @Column("datetime", { name: "FechaInicioInscripcionCBE", nullable: true })
  fechaInicioInscripcionCbe: Date | null;

  @Column("datetime", { name: "FechaFinInscripcionCBE", nullable: true })
  fechaFinInscripcionCbe: Date | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
