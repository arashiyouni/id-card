export const EnvConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_DB,
    sqldb: process.env.REGACADEMICO_DB,
    user: process.env.USER_SQL,
    pass: process.env.PASSWORD_SQL,
    portSQl: 1433,
    host: process.env.HOST_SQL,
    jwt: process.env.SECRET
})