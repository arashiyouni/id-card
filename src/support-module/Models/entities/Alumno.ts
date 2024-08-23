import { Column, Entity } from "typeorm";

@Entity("alumno", { schema: "dbo" })
export class Alumno {
  @Column("nvarchar", { name: "idalumno", nullable: true, length: 8 })
  idalumno: string | null;

  @Column("nvarchar", { name: "nombres", nullable: true, length: 150 })
  nombres: string | null;

  @Column("nvarchar", { name: "apellido1", nullable: true, length: 50 })
  apellido1: string | null;

  @Column("nvarchar", { name: "apellido2", nullable: true, length: 50 })
  apellido2: string | null;

  @Column("nvarchar", { name: "apellido3", nullable: true, length: 50 })
  apellido3: string | null;

  @Column("nvarchar", { name: "idcategori", nullable: true, length: 1 })
  idcategori: string | null;

  @Column("nvarchar", { name: "idtipoing", nullable: true, length: 1 })
  idtipoing: string | null;

  @Column("nvarchar", { name: "tipingtemp", nullable: true, length: 1 })
  tipingtemp: string | null;

  @Column("nvarchar", { name: "idcarrera", nullable: true, length: 6 })
  idcarrera: string | null;

  @Column("nvarchar", { name: "sexo", nullable: true, length: 1 })
  sexo: string | null;

  @Column("datetime", { name: "fechnac", nullable: true })
  fechnac: Date | null;

  @Column("nvarchar", { name: "iddeptonac", nullable: true, length: 2 })
  iddeptonac: string | null;

  @Column("nvarchar", { name: "idmuninac", nullable: true, length: 4 })
  idmuninac: string | null;

  @Column("nvarchar", { name: "cicloingre", nullable: true, length: 7 })
  cicloingre: string | null;

  @Column("nvarchar", { name: "idestafam", nullable: true, length: 1 })
  idestafam: string | null;

  @Column("nvarchar", { name: "idsituacionfam", nullable: true, length: 1 })
  idsituacionfam: string | null;

  @Column("nvarchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("nvarchar", { name: "numdui", nullable: true, length: 15 })
  numdui: string | null;

  @Column("nvarchar", { name: "nit", nullable: true, length: 17 })
  nit: string | null;

  @Column("nvarchar", { name: "idpais", nullable: true, length: 3 })
  idpais: string | null;

  @Column("nvarchar", { name: "IdTipoFinan", nullable: true, length: 2 })
  idTipoFinan: string | null;

  @Column("nvarchar", { name: "becainstitucion", nullable: true, length: 150 })
  becainstitucion: string | null;

  @Column("smallint", { name: "idplan", nullable: true })
  idplan: number | null;

  @Column("nvarchar", { name: "idusuario", nullable: true, length: 10 })
  idusuario: string | null;

  @Column("datetime", { name: "fech_act", nullable: true })
  fechAct: Date | null;

  @Column("nvarchar", { name: "idexpe", nullable: true, length: 17 })
  idexpe: string | null;

  @Column("datetime", { name: "fecha_conta", nullable: true })
  fechaConta: Date | null;
}
