import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("vInscripcionEspecializacion", { schema: "dbo" })
export class VInscripcionEspecializacion {
  @PrimaryColumn({name: "IdInscripcionEspecializacion",type:"int" })
  // @Column("int", { name: "IdInscripcionEspecializacion", nullable: true })
  idInscripcionEspecializacion: number | null;

  @Column("varchar", { name: "IdAlumno", nullable: true, length: 8 })
  idAlumno: string | null;

  @Column("float", { name: "Nota", nullable: true, precision: 53 })
  nota: number | null;

  @Column("int", { name: "IdHorarioEspecializacion", nullable: true })
  idHorarioEspecializacion: number | null;

  @Column("varchar", { name: "Grupo", nullable: true, length: 2 })
  grupo: string | null;

  @Column("varchar", { name: "Horario", nullable: true, length: 500 })
  horario: string | null;

  @Column("smallint", { name: "Cupo", nullable: true })
  cupo: number | null;

  @Column("int", { name: "IdModuloEspecializacion", nullable: true })
  idModuloEspecializacion: number | null;

  @Column("varchar", { name: "Modulo", nullable: true, length: 150 })
  modulo: string | null;

  @Column("int", { name: "IdEspecializacion", nullable: true })
  idEspecializacion: number | null;

  @Column("varchar", { name: "Especializacion", nullable: true, length: 150 })
  especializacion: string | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("char", { name: "Ciclo", nullable: true, length: 7 })
  ciclo: string | null;

  @Column("smallint", { name: "IdSede", nullable: true })
  idSede: number | null;
}
