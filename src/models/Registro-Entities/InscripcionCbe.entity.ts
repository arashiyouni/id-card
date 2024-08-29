import { Column, Entity } from "typeorm";

@Entity("InscripcionCBE", { schema: "dbo" })
export class InscripcionCbe {
  @Column("int", { name: "IdInscripcionCBE", nullable: true })
  idInscripcionCbe: number | null;

  @Column("int", { name: "IdHorarioCBE", nullable: true })
  idHorarioCbe: number | null;

  @Column("nvarchar", { name: "IdAlumno", nullable: true, length: 8 })
  idAlumno: string | null;

  @Column("bit", { name: "Validada", nullable: true })
  validada: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
