import { Column, Entity } from "typeorm";

@Entity("carrera", { schema: "dbo" })
export class Carrera {
  @Column("nvarchar", { name: "sede", nullable: true, length: 2 })
  sede: string | null;

  @Column("nvarchar", { name: "idcarrera", nullable: true, length: 6 })
  idcarrera: string | null;

  @Column("nvarchar", { name: "cod_carr", nullable: true, length: 2 })
  codCarr: string | null;

  @Column("nvarchar", { name: "idfacultad", nullable: true, length: 2 })
  idfacultad: string | null;

  @Column("nvarchar", { name: "nombre", nullable: true, length: 150 })
  nombre: string | null;

  @Column("smallint", { name: "numciclo", nullable: true })
  numciclo: number | null;

  @Column("smallint", { name: "nummat", nullable: true })
  nummat: number | null;

  @Column("nvarchar", { name: "activa", nullable: true, length: 1 })
  activa: string | null;

  @Column("nvarchar", { name: "nuevoing", nullable: true, length: 1 })
  nuevoing: string | null;

  @Column("bit", { name: "equivalencias", nullable: true })
  equivalencias: boolean | null;

  @Column("bit", { name: "reingreso", nullable: true })
  reingreso: boolean | null;

  @Column("nvarchar", { name: "postgrado", nullable: true, length: 1 })
  postgrado: string | null;

  @Column("varchar", { name: "Modalidad", nullable: true, length: 50 })
  modalidad: string | null;

  @Column("bit", { name: "ASU", nullable: true })
  asu: boolean | null;
}
