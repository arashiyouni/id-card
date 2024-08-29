import { Column, Entity } from "typeorm";

@Entity("InscripcionProyectoEmprendimiento", { schema: "dbo" })
export class InscripcionProyectoEmprendimiento {
  @Column("int", {
    name: "IdInscripcionProyectoEmprendimiento",
    nullable: true,
  })
  idInscripcionProyectoEmprendimiento: number | null;

  @Column("varchar", { name: "IdAlumno", nullable: true, length: 8 })
  idAlumno: string | null;

  @Column("int", { name: "IdCicloEG", nullable: true })
  idCicloEg: number | null;

  @Column("bit", { name: "Validada", nullable: true })
  validada: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
