import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Modulos } from "src/common/interface/mongo/documents/modulos";


@Injectable()
export class GestionFechas {
    constructor(
        @Inject('PROCESOS_DOCUMENT')
        private  gestionProcesoModulos: Model<Modulos>
    ) { }

    async procesosActivosCarnetizacion(ciclo: string, tipoCarnet: string) {

        const cicloModulo = await this.gestionProcesoModulos.find({ ciclo: ciclo })

        const modulo = cicloModulo.filter(estudiante =>
            estudiante.idModulo === tipoCarnet && estudiante.ciclo === ciclo
        )

        return modulo.length > 0 ? modulo : []
    }
}