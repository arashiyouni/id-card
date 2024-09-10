import { Inject } from "@nestjs/common";
import { Repository } from "typeorm";


export class CarnetEstudiante {
    constructor(
        @Inject('CARNET_EQUIVALENTE_REPOSITORY')
        private carnetEquivalenteRepository: Repository<CarnetEstudiante>
    ){}

    async buscarCarnetEquivalente(carnet: string){
        const carnetEquivalente = await this.carnetEquivalenteRepository
        .createQueryBuilder('carnet')
        .select(['carnet.carnetEquivalente'])
        .where('carne = :idCarnet', {idCarnet: carnet})
        .getOne()

        return carnetEquivalente
    }
}