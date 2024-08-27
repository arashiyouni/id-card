import { join } from 'path';
import { DataSource } from 'typeorm';

/**
 * El `DataSource` representa la conexion de la base de datos, se utiliza para configurar y manejar la comunicacion con las base
 */
export const AppDataSource = [{
    name: 'SQL_SERVER',
    //este es my async provider
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        //aca se establece los detalles de la conexion
        const dataSource = new DataSource({
            type: 'mssql',
            host: process.env.HOST_SQL,
            port: 1433,
            username: process.env.USER_SQL,
            password: process.env.PASSWORD_SQL,
            database: process.env.REGACADEMICO_DB,
            /**dirnmae contiene el nombre del dierecto del modulo actual:  */
            //[join(__dirname, '../../**/*.entity.{js,ts}')],
            entities: [join(__dirname, '../../**/*.entity.{js,ts}')],
            synchronize: false,
            options: {
                encrypt: true,
                trustServerCertificate: true,
            },
            extra: {
                autoLoadEntities: true,
                pool: {
                    max: 10,
                    min: 0,
                    idleTimeoutMillis: 3000,
                }
            }
        });

        try {
            await dataSource.initialize();
            console.log("🤝 | Data Source (SQL) has been initialized!");
            return dataSource;
        } catch (err) {
            console.error("Error during Data Source initialization:", err);
        }
    }
}]
