import { PicturesEgresado } from "src/models/Fotos-Entities/Pictures";
import { DataSource } from "typeorm";

export const FotosProvider = [
    {
        provide: 'FOTOS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(PicturesEgresado),
        inject: ['DATA_SOURCE_FOTOS'],
    },
]