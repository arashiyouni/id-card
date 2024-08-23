import { Column, Entity } from "typeorm";

@Entity("profesor", { schema: "dbo" })
export class Profesor {
  @Column("nvarchar", { name: "idprofesor", nullable: true, length: 6 })
  idprofesor: string | null;

  @Column("nvarchar", { name: "apellido1", nullable: true, length: 50 })
  apellido1: string | null;

  @Column("nvarchar", { name: "apellido2", nullable: true, length: 50 })
  apellido2: string | null;

  @Column("nvarchar", { name: "apellido3", nullable: true, length: 50 })
  apellido3: string | null;

  @Column("nvarchar", { name: "nombres", nullable: true, length: 100 })
  nombres: string | null;

  @Column("nvarchar", { name: "sexo", nullable: true, length: 1 })
  sexo: string | null;

  @Column("smalldatetime", { name: "fechnac", nullable: true })
  fechnac: Date | null;

  @Column("nvarchar", { name: "DUI", nullable: true, length: 12 })
  dui: string | null;

  @Column("nvarchar", { name: "tipocontrato", nullable: true, length: 2 })
  tipocontrato: string | null;

  @Column("smalldatetime", { name: "fechaingreso", nullable: true })
  fechaingreso: Date | null;

  @Column("nvarchar", { name: "idfacultad", nullable: true, length: 2 })
  idfacultad: string | null;

  @Column("nvarchar", { name: "telefijo_res", nullable: true, length: 8 })
  telefijoRes: string | null;

  @Column("nvarchar", { name: "telefcelul", nullable: true, length: 10 })
  telefcelul: string | null;

  @Column("nvarchar", { name: "lugartrab", nullable: true, length: 150 })
  lugartrab: string | null;

  @Column("nvarchar", { name: "teltrab", nullable: true, length: 8 })
  teltrab: string | null;

  @Column("nvarchar", { name: "cargotrab", nullable: true, length: 150 })
  cargotrab: string | null;

  @Column("nvarchar", { name: "nacionalidad", nullable: true, length: 6 })
  nacionalidad: string | null;

  @Column("nvarchar", { name: "nit", nullable: true, length: 22 })
  nit: string | null;

  @Column("nvarchar", { name: "postgrado", nullable: true, length: 3 })
  postgrado: string | null;

  @Column("nvarchar", { name: "titulo_postg", nullable: true, length: 150 })
  tituloPostg: string | null;

  @Column("nvarchar", { name: "grado_acad", nullable: true, length: 3 })
  gradoAcad: string | null;

  @Column("nvarchar", { name: "titulo_grado", nullable: true, length: 150 })
  tituloGrado: string | null;

  @Column("nvarchar", { name: "login", nullable: true, length: 10 })
  login: string | null;

  @Column("nvarchar", { name: "clave", nullable: true, length: 50 })
  clave: string | null;

  @Column("nvarchar", { name: "nverifica", nullable: true, length: 3 })
  nverifica: string | null;

  @Column("nvarchar", { name: "email", nullable: true, length: 300 })
  email: string | null;

  @Column("nvarchar", { name: "calleaven", nullable: true, length: 250 })
  calleaven: string | null;

  @Column("nvarchar", { name: "colonibarr", nullable: true, length: 100 })
  colonibarr: string | null;

  @Column("nvarchar", { name: "numeroc", nullable: true, length: 10 })
  numeroc: string | null;

  @Column("nvarchar", { name: "pasaje", nullable: true, length: 50 })
  pasaje: string | null;

  @Column("nvarchar", { name: "iddepto", nullable: true, length: 2 })
  iddepto: string | null;

  @Column("nvarchar", { name: "idmunicipi", nullable: true, length: 5 })
  idmunicipi: string | null;

  @Column("smallint", { name: "mclave", nullable: true })
  mclave: number | null;
}
