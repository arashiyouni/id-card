import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Modulos } from "./gestion-modulos.interface";


@Injectable()
export class GestionFechas{
    constructor(
        @InjectModel('GestionFechas')
        private readonly gestionProcesoModulos: Model<Modulos>
    ){}

    async findAll(ciclo: string){
        try{
            const modulos = await this.gestionProcesoModulos.find({ciclo: ciclo})

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