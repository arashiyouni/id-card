import { Inject, Injectable } from "@nestjs/common";
import { FotoHexa } from "src/common/interface/sql/parameters/insertar-foto";
import { PicturesEgresado } from "src/models/Fotos-Entities/Pictures";
import { Pictures } from "src/models/RegAcademico-Entities/Pictures.entity";
import { Repository } from "typeorm";



@Injectable()
export class FotoEstudiante {
    constructor(
        @Inject('PICTURES_REPOSITORY')
        private fotoEstudianteRepository: Repository<Pictures>,
        @Inject('FOTOS_REPOSITORY')
        private fotoEstudianteEgresadoRepository: Repository<PicturesEgresado>
    ) { }

    async insertarFotoSql(data: FotoHexa) {
        const fotoSql = await this.fotoEstudianteRepository
            .createQueryBuilder()
            .insert()
            .into(Pictures)
            .values([
                { id: data.carnet, length: data.length, picture: data.foto, type: data.idSede, fecha: data.date }
            ])
            .execute()

        return !!fotoSql
    }
    async eliminarFotoSql(carnet: string ){
        const eliminar = await this.fotoEstudianteRepository
        .createQueryBuilder()
        .delete()
        .from(Pictures)
        .where('id = :id', {id: carnet})
        .execute()

        return !!eliminar
    }
    /**Busca la foto de pregrado y postgrado */
    async buscarFotoCarnetSql(carnet: string) {
        const fotoSql = await this.fotoEstudianteRepository
            .find({
                select: {
                    id: true,
                    picture: true
                },
                where: {
                    id: carnet
                }
            })

        return !fotoSql
    }

    async buscarFotoEgresadoSql(carnet: string) {
        const fotoSql = await this.fotoEstudianteEgresadoRepository
            .find({
                select: {
                    id: true,
                    picture: true
                },
                where: {
                    id: carnet
                }
            })

        return fotoSql

    }

    async actualizarFotoSql(carnet: string, foto: Buffer){
        const update = await this.fotoEstudianteRepository
        .createQueryBuilder()
        .update(Pictures)
        .set({
            picture: foto
        })
        .where('id = :id', {id: carnet})
        .execute()

        return !!update
    }
}