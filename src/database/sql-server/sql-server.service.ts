
import { DataSource } from 'typeorm';
// import * as sql from 'mssql'

// @Injectable()
// export class SqlServerService {

//     private sqlConfig: sql.config
//     private sqlPool: sql.ConnectionPool

//     constructor() {
//         this.sqlConfig = {
//             user: process.env.USER_SQL,
//             password: process.env.PASSWORD_SQL,
//             server: process.env.HOST,
//             database: process.env.REGACADEMICO_DB,
//             options: {
//                 encrypt: true,
//                 trustServerCertificate: true
//             },
//             sqlPool: {
//                 max: 10,
//                 min: 0,
//                 idleTimeoutMillis: 30000,

//             }
//         }
//         this.initialize()
//     }

//     private async initialize() {
//         try {
//             this.sqlPool = await sql.connect(this.sqlConfig)
//             console.log('🙌 | Database SQL Server connected')
//         } catch (err) {
//             console.log('🚩 KHEK, ERROR IN INITIALIZE ')
//             throw err
//         }
//     }

//     private async runQuery(sqlQuery: string) {
//         try {
//             const result = await this.sqlPool.request().query(sqlQuery)
//             return result.recordset
//         } catch (err) {
//             console.log('🚩 KHEK, ERROR IN QUERY ')
//             throw err
//         }
//     }

//     async onModuleDestroy() {
//         try {
//             if (this.sqlPool) {
//                 await this.sqlPool.close()
//                 console.log('🚪 | Database connection pool closed')
//             }
//         } catch (err) {
//             console.log('🚩 | Someting ocurring in onModuleDestroy...')
//             throw err
//         }
//     }
// }

export const AppDataSource = [{
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        const dataSource = new DataSource({
            type: 'mssql',
            host: process.env.HOST,
            port: 1433,
            username: process.env.USER_SQL,
            password: process.env.PASSWORD_SQL,
            database: process.env.REGACADEMICO_DB,
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
