import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("movimientoa", { schema: "dbo" })
export class Movimientoa {
  
  @PrimaryGeneratedColumn({name: "IdMovimientoa",type:"int" })
  //@Column("int", { name: "IdMovimientoa", nullable: true })
  idMovimientoa: number | null;

  @Column("nvarchar", { name: "idalumno", nullable: true, length: 8 })
  idalumno: string | null;

  @Column("smallint", { name: "idaccion", nullable: true })
  idaccion: number | null;

  @Column("datetime", { name: "fechamov", nullable: true })
  fechamov: Date | null;

  @Column("nvarchar", { name: "cicloa", nullable: true, length: 7 })
  cicloa: string | null;

  @Column("nvarchar", { name: "ciclor", nullable: true, length: 7 })
  ciclor: string | null;

  @Column("nvarchar", { name: "idmateria", nullable: true, length: 4 })
  idmateria: string | null;

  @Column("nvarchar", { name: "matricula", nullable: true, length: 1 })
  matricula: string | null;

  @Column("nvarchar", { name: "secc_ant", nullable: true, length: 3 })
  seccAnt: string | null;

  @Column("nvarchar", { name: "secc_act", nullable: true, length: 3 })
  seccAct: string | null;

  @Column("nvarchar", { name: "carr_act", nullable: true, length: 6 })
  carrAct: string | null;

  @Column("nvarchar", { name: "carr_ant", nullable: true, length: 6 })
  carrAnt: string | null;

  @Column("smallint", { name: "plan_act", nullable: true })
  planAct: number | null;

  @Column("smallint", { name: "plan_ant", nullable: true })
  planAnt: number | null;

  @Column("nvarchar", { name: "idmateriae", nullable: true, length: 4 })
  idmateriae: string | null;

  @Column("nvarchar", { name: "idmateriap", nullable: true, length: 4 })
  idmateriap: string | null;

  @Column("nvarchar", { name: "idusuario", nullable: true, length: 20 })
  idusuario: string | null;

  @Column("nvarchar", { name: "resolucion", nullable: true, length: 1500 })
  resolucion: string | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 9 })
  telefono: string | null;

  @Column("varchar", { name: "Correo", nullable: true, length: 250 })
  correo: string | null;

  @Column("smallint", { name: "IdCicloProceso", nullable: true })
  idCicloProceso: number | null;
}
