
export interface Foto extends Document {
    Token: string,
    Activo?: number
    Apellidos: string 
    CarnetEquivalente: string
    Carnet: string
    Email: string
    FechaModificacion: Date
    FechaRegistro: Date
    Foto?: string
    IdSede?: number,
    Qr?: string
    TipoCarnet: string
    NombreFacultad: string
    NombreCarrera: string
    Nombres: string
    CicloCarnetizacion: string
    IdFacultad: string
    Seguimiento?: [Seguimiento],
    InscripcionFile?: string
    InscripcionFileName?: string
    CalificacionesFileName?: string
    CalificacionesFile?: string
}

export interface Seguimiento extends Document {
    Paso: string
    Descripcion: string
    Activo: 1 | 0
    Usuario: string
    FechaRegistro: Date
}