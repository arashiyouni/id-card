import { Column, Entity } from "typeorm";

@Entity("matinsSC", { schema: "dbo" })
export class MatinsSc {
  @Column("nvarchar", { name: "idalumno", nullable: true, length: 8 })
  idalumno: string | null;

  @Column("nvarchar", { name: "cic_actual", nullable: true, length: 7 })
  cicActual: string | null;

  @Column("nvarchar", { name: "idmateria", nullable: true, length: 4 })
  idmateria: string | null;

  @Column("nvarchar", { name: "matricula", nullable: true, length: 1 })
  matricula: string | null;

  @Column("nvarchar", { name: "grupot", nullable: true, length: 3 })
  grupot: string | null;

  @Column("nvarchar", { name: "grupol", nullable: true, length: 2 })
  grupol: string | null;

  @Column("nvarchar", { name: "uv", nullable: true, length: 2 })
  uv: string | null;

  @Column("float", { name: "lab1", nullable: true, precision: 53 })
  lab1: number | null;

  @Column("float", { name: "exa1", nullable: true, precision: 53 })
  exa1: number | null;

  @Column("float", { name: "lab2", nullable: true, precision: 53 })
  lab2: number | null;

  @Column("float", { name: "exa2", nullable: true, precision: 53 })
  exa2: number | null;

  @Column("float", { name: "lab3", nullable: true, precision: 53 })
  lab3: number | null;

  @Column("float", { name: "exa3", nullable: true, precision: 53 })
  exa3: number | null;

  @Column("float", { name: "lab4", nullable: true, precision: 53 })
  lab4: number | null;

  @Column("float", { name: "exa4", nullable: true, precision: 53 })
  exa4: number | null;

  @Column("float", { name: "plab", nullable: true, precision: 53 })
  plab: number | null;

  @Column("float", { name: "pexa", nullable: true, precision: 53 })
  pexa: number | null;

  @Column("float", { name: "notaf", nullable: true, precision: 53 })
  notaf: number | null;

  @Column("datetime", { name: "fech_ins", nullable: true })
  fechIns: Date | null;

  @Column("nvarchar", { name: "user_ins", nullable: true, length: 10 })
  userIns: string | null;

  @Column("nvarchar", { name: "internet", nullable: true, length: 1 })
  internet: string | null;

  @Column("float", { name: "ti", nullable: true, precision: 53 })
  ti: number | null;

  @Column("nvarchar", { name: "ip", nullable: true, length: 16 })
  ip: string | null;

  @Column("nvarchar", { name: "hostn", nullable: true, length: 50 })
  hostn: string | null;

  @Column("datetime", { name: "fechap", nullable: true })
  fechap: Date | null;

  @Column("nvarchar", { name: "idbanco", nullable: true, length: 2 })
  idbanco: string | null;

  @Column("datetime", { name: "fechac", nullable: true })
  fechac: Date | null;

  @Column("nvarchar", { name: "vali", nullable: true, length: 1 })
  vali: string | null;

  @Column("datetime", { name: "fech_nota", nullable: true })
  fechNota: Date | null;

  @Column("nvarchar", { name: "ip_mod", nullable: true, length: 16 })
  ipMod: string | null;

  @Column("nvarchar", { name: "host_mod", nullable: true, length: 50 })
  hostMod: string | null;
}
