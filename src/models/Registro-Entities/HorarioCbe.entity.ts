import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("HorarioCBE", { schema: "dbo" })
export class HorarioCbe {
  @PrimaryColumn({name: "IdHorarioCBE",type:"int" })
  // @Column("int", { name: "IdHorarioCBE", nullable: true })
  idHorarioCbe: number | null;

  @Column("char", { name: "Grupo", nullable: true, length: 2 })
  grupo: string | null;

  @Column("varchar", { name: "Horario", nullable: true, length: 150 })
  horario: string | null;

  @Column("smallint", { name: "Cupo", nullable: true })
  cupo: number | null;

  @Column("int", { name: "IdAula", nullable: true })
  idAula: number | null;

  @Column("int", { name: "IdCicloEG", nullable: true })
  idCicloEg: number | null;

  @Column("smallint", { name: "IdSede", nullable: true })
  idSede: number | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;
}
