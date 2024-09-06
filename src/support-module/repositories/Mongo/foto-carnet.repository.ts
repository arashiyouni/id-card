import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Foto } from "src/models/interfaces/foto-carnet.interface";
@Injectable()
export class FotoCarnet {
    constructor(
        @Inject('FOTO_CARNET_MODEL')
        private readonly fotoCarnetRepository: Model<Foto>,
        // private readonly carnet: carnetizacion
    ) { }

    async guardarFoto(
        nombres: string, apellidos: string, email: string, carnet: string, tipoCarnet: string, fotoCarnet: string, idFacultad: string, facultad: string, carrera: string, ciclo: string
    ) {

        //2. validar ese estudiante
        // const estudiante = await this.carnet.obtenerCarnet(carnet, tipoCarnet)

        //if(!estudiante) return false

        ///4. generar el token
        const token = 'ANGIE123PRUEBA'
        //5. guardar en la bd
        try {
            const guardarCarnetMongo = await this.fotoCarnetRepository.create({
                CicloCarnetizacion: ciclo,
                TipoCarnet: tipoCarnet,
                Carnet: carnet,
                Nombres: nombres,
                Apellidos: apellidos,
                Email: email,
                IdFacultad: idFacultad,
                NombreFacultad: facultad,
                NombreCarrera: carrera,
                Foto: fotoCarnet,
                FechaRegistro: new Date(),
                FechaModificacion: new Date()
            })

            return {
                msg: 'Foto guardada en mongo',
                token_proceso: token,
                guardarCarnetMongo
            }
        } catch (err) {
            console.error('Error guardando la foto:', err);
            throw new Error('Error al guardar la foto en MongoDB');
        }
    }
}