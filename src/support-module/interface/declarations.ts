//permite multiples tipos sin tener que especificar esos tipos de antemano
export interface RepositoryDB{
    insert()
    get(carnet: string)
    update()
}

export enum TipoCarnet{
    PREGRADO = "PREGRADO",
    POSTGRADO = "POSTGRADO",
    EGRESADO = "EGRESADO"
}