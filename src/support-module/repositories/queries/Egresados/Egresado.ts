import { Inject, Injectable } from "@nestjs/common";
import { DataSource} from "typeorm";



@Injectable()
export class Egresado {
    constructor(
        @Inject('DATA_SOURCE_ACADEMICO')
        private readonly dataSource: DataSource
    ) { }

    async buscarEgresado(carnet: string) {
        const egresado = await this.dataSource
        .query("EXEC Egreso @0", [carnet])

        return {
            msg: 'Egresado Encontrado',
            egresado
        }
    }
}