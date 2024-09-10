import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Modulos } from "src/common/interface/mongo/documents/modulos";


@Injectable()
export class GestionFechas{
    constructor(
        @Inject('PROCESOS_MODEL')
        private readonly gestionProcesoModulos: Model<Modulos>
    ){}

    async procesosActivosCarnetizacion(ciclo: string){
        //TODO: VALIDAR QUE SE INGRESE UN CICLO

        try{
            const modulos = await this.gestionProcesoModulos.find({ciclo: ciclo})

            if (!modulos || modulos.length === 0) {
                throw new NotFoundException('No se encontraron procesos para el ciclo especificado');
            }

            //devolver los que solo son de carnetizacion
            const active = modulos.filter((isActive) => !!isActive.activo)

            const moduloCarnetizacion = active.filter((modulo) =>{
                if(modulo.idModulo == "carnetizacion-pre-grado" || modulo.idModulo == "carnetizacion-post-grado" || modulo.idModulo == "carnetizacion-egresados")
                return {
                    activo: modulo.activo,
                    ciclo: modulo.ciclo,
                    idModulo: modulo.idModulo,
                    fechaInicio: modulo.fechaFin,
                    fechaFin: modulo.fechaFin
                }
            })

            if(moduloCarnetizacion.length === 0) return {
                msg: 'No se encontraron procesos para el ciclo especificado', moduloCarnetizacion: []
            }

            return {
                msg: 'Modulos Activos de Carnetizacion', moduloCarnetizacion
            }

        }catch(err){
            console.error(err)
            throw new NotFoundException()
        }
    }
}