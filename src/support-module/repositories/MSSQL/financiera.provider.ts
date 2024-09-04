import { PagoEstudiante } from "src/models/Financiera-Entities/PagoEstudiante";
import { DataSource } from "typeorm";

export const FinancieraProvider = [
    {
        provide: 'PAGOESTUDIANTE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PagoEstudiante),
        inject: ['DATA_SOURCE_FINANCIERA'],
    },
]