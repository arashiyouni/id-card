import { join } from 'path';
import { CarneEquivalente } from 'src/models/UFGRegistroAcademico-Entities/CarneEquivalente';
import { VPerfilEstudiante } from 'src/models/UFGRegistroAcademico-Entities/VPerfilEstudiante';
import { DataSource } from 'typeorm';

/**
 * El `DataSource` representa la conexion de la base de datos, se utiliza para configurar y manejar la comunicacion con las base
 */
const defaultOptions = {
    host: "192.168.98.20",
    port: 1433,
    username: "sa",
    password: "5dZ8psbVg7mp6M",
    synchronize: false,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    extra: {
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 3000,
        }
    }
}

export const AppDataSource = [
    {
        //etiqueta para referirse a un modulo
        name: 'SQL_SERVER_ACADEMICO',
        provide: 'DATA_SOURCE_ACADEMICO',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mssql',
                ...defaultOptions,
                logging: ['query'],
                database: process.env.REGACADEMICO_DB,
                entities: [join(__dirname, '../../**/*.entity.{js,ts}')]
            });

            try {
                await dataSource.initialize();
                console.log("🤝 | Data Source (SQL): <RegAcademico> has been initialized!");
                return dataSource;
            } catch (err) {
                console.error("🚑 | Error during Data Source <RegAcademico> initialization:", err);
            }
        }
    },{
        //etiqueta para referirse a un modulo
        name: 'SQL_SERVER_UFGREGISTROACADEMICO',
        provide: 'DATA_SOURCE_UFGREGISTRO',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mssql',
                ...defaultOptions,
                logging: ['query'],
                database: process.env.UFGREGAC_DB,
                entities: [VPerfilEstudiante,CarneEquivalente ],
            });

            try {
                await dataSource.initialize();
                console.log("🤝 | Data Source (SQL): <UFGRegistroAcademico> has been initialized!");
                return dataSource;
            } catch (err) {
                console.error("🚑 | Error during Data Source <UFGRegistroAcademico> initialization:", err);
            }
        }
    }, {
        //etiqueta para referirse a un modulo
        name: 'SQL_SERVER_FINANCIERA',
        provide: 'DATA_SOURCE_FINANCIERA',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mssql',
                ...defaultOptions,
                database: process.env.FINANCIERA_DB,
                // entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
            });

            try {
                await dataSource.initialize();
                console.log("🤝 | Data Source (SQL): <Financiera> has been initialized!");
                return dataSource;
            } catch (err) {
                console.error("🚑 | Error during Data Source <Financiera> initialization:", err);
            }
        }
    }, {
        //etiqueta para referirse a un modulo
        name: 'SQL_SERVER_REGISTRO',
        provide: 'DATA_SOURCE_REGISTRO',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mssql',
                ...defaultOptions,
                database: process.env.REGISTRO_DB,
                entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
            });

            try {
                await dataSource.initialize();
                console.log("🤝 | Data Source (SQL): <REGISTRO> has been initialized!");
                return dataSource;
            } catch (err) {
                console.error("🚑 | Error during Data Source <REGISTRO> initialization:", err);
            }
        }
    }, {
        //etiqueta para referirse a un modulo
        name: 'SQL_SERVER_FOTOS',
        provide: 'DATA_SOURCE_FOTOS',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mssql',
                ...defaultOptions,
                database: process.env.FOTOS_DB,
                entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
            });

            try {
                await dataSource.initialize();
                console.log("🤝 | Data Source (SQL): <FOTOS> has been initialized!");
                return dataSource;
            } catch (err) {
                console.error("🚑 | Error during Data Source <FOTOS> initialization:", err);
            }
        }
    }

]
