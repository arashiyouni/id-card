import { Inject } from "@nestjs/common";
import { CarneEquivalente } from "src/models/UFGRegistroAcademico-Entities/CarneEquivalente";
import { Repository } from "typeorm";


export class CarnetEstudiante {
    constructor(
        @Inject('CARNET_EQUIVALENTE_REPOSITORY')
        private carnetEquivalenteRepository: Repository<CarneEquivalente>
    ){}

    async buscarCarnetEquivalente(carnet: string){
        const carnetEquivalente = await this.carnetEquivalenteRepository
        .createQueryBuilder('carnet')
        .select(['carnet.carnetEquivalente'])
        .where('carnet = :idCarnet', {idCarnet: carnet})
        .getOne()


        if(!carnetEquivalente) return ''

        return carnetEquivalente.carnetEquivalente
    }
}