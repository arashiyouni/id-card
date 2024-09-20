import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { FotoExepcion } from "src/common/interface/mongo/documents/Foto";
import { IFotoExcepcion } from "src/common/interface/mongo/parameters/foto-excepcion.interface";

@Injectable()
export class RegistrarExcepcion {
    constructor(
        @Inject('FOTO_EXEPCION_DOCUMENT')
        private fotoExepcionRepository: Model<FotoExepcion>
    ) { }

    async crearExcepcion(excepcion: IFotoExcepcion) {
        const { Activo, Carnet, CicloCarnetizacion, Descripcion, FechaModificacion, FechaRegistro, Observacion, TipoCarnet, Usuario } = excepcion

        const guardarExcepcion = await this.fotoExepcionRepository.create({
            Activo,
            Carnet,
            CicloCarnetizacion,
            Descripcion,
            FechaModificacion,
            FechaRegistro,
            Observacion,
            TipoCarnet,
            Usuario
        })

     return !!guardarExcepcion
    }
}