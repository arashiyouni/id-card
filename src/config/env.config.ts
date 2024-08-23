export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_DB,
    sqldb: process.env.DATABASE_SQL,
    user: process.env.USER_SQL,
    pass: process.env.PASSWORD_SQL,
    portSQl: process.env.PORT_SQL,
    host: process.env.HOST,
    jwt: process.env.SECRET
})