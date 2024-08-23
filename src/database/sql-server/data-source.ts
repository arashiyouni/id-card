
import { DataSource } from "typeorm";


export const DataSourceSQlServer = {
    type: 'mssql',
    host: process.env.HOST,
    port: 1433,
    username: process.env.USER_SQL,
    password: process.env.PASSWORD_SQL,
    database: process.env.REGACADEMICO_DB,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    extra: {
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        },
        listeners: {
            async beforeConnect() {
              console.log('🔗 | Attempting to connect to TypeORM...');
            },
            async afterConnect() {
              console.log('🙌 | TypeORM Connection Established Successfully');
            },
            async beforeClose() {
              console.log('🚪 | Closing TypeORM Connection...');
            },
            async afterClose() {
              console.log('🚪 | TypeORM Connection Closed Successfully');
            },
          },
    }
}

// export const dataSource = new DataSource(DataSourceSQlServer)