import { DataSource } from 'typeorm';

export const AppDataSource = [{
    provide: 'DATA_SOURCE',
    exports: ['DATA_SOURCE'],
    useFactory: async () => {
        const dataSource = new DataSource({
            type: 'mssql',
            host: process.env.HOST_SQL,
            port: 1433,
            username: process.env.USER_SQL,
            password: process.env.PASSWORD_SQL,
            database: process.env.REGACADEMICO_DB,
            //entities: [Alumno, Carrera, Facultad, Matins, MatinsSc, Movimientoa, Picture, Profesor, Tacciones],
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
        })
        return dataSource.initialize().then(() => {
            console.log("🤝 | Data Source (SQL) has been initialized!")
        })
            .catch((err) => {
                console.error("🚑 | Error during Data Source initialization", err)
            })
    }
}] 
