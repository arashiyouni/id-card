import { Column, Entity } from "typeorm";

@Entity("alumnores", { schema: "dbo" })
export class Alumnores {
  @Column("bigint", { name: "IdAlumnoRes", nullable: true })
  idAlumnoRes: string | null;

  @Column("nvarchar", { name: "idalumno", nullable: true, length: 8 })
  idalumno: string | null;

  @Column("smallint", { name: "iddireccio", nullable: true })
  iddireccio: number | null;

  @Column("nvarchar", { name: "telefijo", nullable: true, length: 15 })
  telefijo: string | null;

  @Column("nvarchar", { name: "telcelular", nullable: true, length: 15 })
  telcelular: string | null;

  @Column("nvarchar", { name: "colonibarr", nullable: true, length: 150 })
  colonibarr: string | null;

  @Column("nvarchar", { name: "calleaven", nullable: true, length: 150 })
  calleaven: string | null;

  @Column("nvarchar", { name: "numeroc", nullable: true, length: 50 })
  numeroc: string | null;

  @Column("nvarchar", { name: "iddepto", nullable: true, length: 2 })
  iddepto: string | null;

  @Column("nvarchar", { name: "idmuni", nullable: true, length: 4 })
  idmuni: string | null;

  @Column("nvarchar", { name: "idcanton", nullable: true, length: 6 })
  idcanton: string | null;

  @Column("nvarchar", { name: "idcaserio", nullable: true, length: 8 })
  idcaserio: string | null;

  @Column("bit", { name: "pv", nullable: true })
  pv: boolean | null;

  @Column("nvarchar", { name: "estadolab", nullable: true, length: 1 })
  estadolab: string | null;

  @Column("nvarchar", { name: "lug_trab", nullable: true, length: 100 })
  lugTrab: string | null;

  @Column("nvarchar", { name: "dir_trab", nullable: true, length: 150 })
  dirTrab: string | null;

  @Column("nvarchar", { name: "tel_trab", nullable: true, length: 9 })
  telTrab: string | null;

  @Column("nvarchar", { name: "puestodesemp", nullable: true, length: 100 })
  puestodesemp: string | null;

  @Column("nvarchar", { name: "idusuario", nullable: true, length: 10 })
  idusuario: string | null;

  @Column("datetime", { name: "fechas", nullable: true })
  fechas: Date | null;
}
