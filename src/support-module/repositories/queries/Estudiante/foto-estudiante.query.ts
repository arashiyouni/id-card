import { Inject, Injectable } from "@nestjs/common";
import { Pictures } from "src/models/RegAcademico-Entities/Pictures.entity";
import { Repository } from "typeorm";



@Injectable()
export class FotoEstudiante {
    constructor(
        @Inject('PICTURES_REPOSITORY')
        private fotoEstudiante: Repository<Pictures>
    ){}
}