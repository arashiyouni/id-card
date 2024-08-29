import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("InscripcionExcelencia", { schema: "dbo" })
export class InscripcionExcelencia {
  @PrimaryColumn({name: "IdInscripcionExcelencia",type:"int" })
  // @Column("int", { name: "IdInscripcionExcelencia", nullable: true })
  idInscripcionExcelencia: number | null;

  @Column("varchar", { name: "IdAlumno", nullable: true, length: 8 })
  idAlumno: string | null;

  @Column("int", { name: "IdCicloEG", nullable: true })
  idCicloEg: number | null;

  @Column("bit", { name: "Validada", nullable: true })
  validada: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
