import { Inject, Injectable } from "@nestjs/common";
import { Alumno } from "src/models/RegAcademico-Entities/Alumno.entity";
import { Carrera } from "src/models/RegAcademico-Entities/Carrera.entity";
import { Facultad } from "src/models/RegAcademico-Entities/Facultad.entity";
import { Matins } from "src/models/RegAcademico-Entities/Matins.entity";
import { Repository } from "typeorm";


@Injectable()
export class ValidacionInscripcion {
    constructor(
        @Inject('MATINS_REPOSITORY')
        private readonly matinsRepository: Repository<Matins>
        //MatinsSC
    ){}

    async validacionMatricula(carnet: string){
        const estudianteInscrito = await this.matinsRepository
        .createQueryBuilder('inscripcion')
        .select(['inscripcion.idalumno', 'inscripcion.vali'])
        .innerJoin(Alumno, 'alumno',
            'alumno.idalumno = inscripcion.idalumno'
        )
        .where('alumno.idalumno = :idalumno', {idalumno: carnet})
        .getOne()

        
        if(estudianteInscrito.vali !== 'S'){
            return false
        }

        return {
            msg: 'Estudiante inscrito',
            estudianteInscrito
        }
    }

}