import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("InscripcionPasantia", { schema: "dbo" })
export class InscripcionPasantia {
  @PrimaryColumn({name: "IdInscripcionPasantia",type:"int" })
  // @Column("int", { name: "IdInscripcionPasantia", nullable: true })
  idInscripcionPasantia: number | null;

  @Column("varchar", { name: "IdAlumno", nullable: true, length: 8 })
  idAlumno: string | null;

  @Column("int", { name: "IdCicloEG", nullable: true })
  idCicloEg: number | null;

  @Column("bit", { name: "Validada", nullable: true })
  validada: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
