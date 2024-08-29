import { Column, Entity } from "typeorm";

@Entity("InscripcionProyectoInvestigacion", { schema: "dbo" })
export class InscripcionProyectoInvestigacion {
  @Column("int", { name: "IdInscripcionProyectoInvestigacion", nullable: true })
  idInscripcionProyectoInvestigacion: number | null;

  @Column("varchar", { name: "IdAlumno", nullable: true, length: 8 })
  idAlumno: string | null;

  @Column("int", { name: "IdCicloEG", nullable: true })
  idCicloEg: number | null;

  @Column("bit", { name: "Validada", nullable: true })
  validada: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
