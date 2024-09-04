import { Inject, Injectable } from "@nestjs/common";
import { DataSource} from "typeorm";



@Injectable()
export class Procedure {
    constructor(
        @Inject('DATA_SOURCE_ACADEMICO')
        private readonly dataSource: DataSource
    ) { }

    /** @description Procedimiento Almacenado que busca Egresado por carnet */
    async buscarEgresado(carnet: string) {
        const egresado = await this.dataSource
        .query("EXEC Egreso @0", [carnet])

        return  egresado
    }
}