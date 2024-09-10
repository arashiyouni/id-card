import { Inject, Injectable } from "@nestjs/common";
import { FotoHexa } from "src/common/interface/sql/parameters/insertar-foto";
import { Pictures } from "src/models/RegAcademico-Entities/Pictures.entity";
import { Repository } from "typeorm";



@Injectable()
export class FotoEstudiante {
    constructor(
        @Inject('PICTURES_REPOSITORY')
        private fotoEstudianteRepository: Repository<Pictures>
    ){}

    async insertarFotoSql(data: FotoHexa){
        const fotoSql = this.fotoEstudianteRepository
            .createQueryBuilder()
            .insert()
            .into(Pictures)
            .values([
                {id: data.carnet, length: data.length, picture: data.foto, type: data.idSede, fecha: data.date}
            ])
            .execute()

        return fotoSql
    }
}