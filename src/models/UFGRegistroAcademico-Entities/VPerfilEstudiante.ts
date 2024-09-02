import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("vPerfilEstudiante", { schema: "dbo" })
export class VPerfilEstudiante {
  @PrimaryColumn({
    name: "NombrePerfilLaboratorio",
    type: "varchar"})
  // @Column("varchar", {
  //   name: "NombrePerfilLaboratorio",
  //   nullable: true,
  //   length: 100,
  // })
  nombrePerfilLaboratorio: string | null;

  @Column("varchar", { name: "Carnet", nullable: true, length: 8 })
  carnet: string | null;

  @Column("money", { name: "Monto", nullable: true })
  monto: number | null;

  @Column("varchar", { name: "NombrePerfil", nullable: true, length: 100 })
  nombrePerfil: string | null;

  @Column("int", { name: "IdPerfil", nullable: true })
  idPerfil: number | null;

  @Column("bit", { name: "Activo", nullable: true })
  activo: boolean | null;

  @Column("datetime", { name: "FechaPerfilEstudiante", nullable: true })
  fechaPerfilEstudiante: Date | null;
}
