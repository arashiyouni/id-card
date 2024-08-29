import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("PAGO_ESTUDIANTE", { schema: "dbo" })
export class PagoEstudiante {
  @PrimaryColumn({name: "ID_pago",type:"bigint" })
  //@Column("bigint", { name: "ID_pago", nullable: true })
  idPago: string | null;

  @Column("nvarchar", { name: "ID_alumno", nullable: true, length: 15 })
  idAlumno: string | null;

  @Column("varchar", { name: "npe", nullable: true, length: 50 })
  npe: string | null;

  @Column("datetime", { name: "fecha_vencimiento", nullable: true })
  fechaVencimiento: Date | null;

  @Column("varchar", { name: "descripcion", nullable: true, length: 500 })
  descripcion: string | null;

  @Column("bigint", { name: "prerrequisito", nullable: true })
  prerrequisito: string | null;

  @Column("bigint", { name: "factura", nullable: true })
  factura: string | null;

  @Column("varchar", {
    name: "identificador_registro",
    nullable: true,
    length: 50,
  })
  identificadorRegistro: string | null;

  @Column("varchar", { name: "estado", nullable: true, length: 5 })
  estado: string | null;
}
