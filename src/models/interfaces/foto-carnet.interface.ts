
export interface Foto extends Document {
    Token: string,
    IdSede?: number,
    CicloCarnetizacion: string
    TipoCarnet: string
    Carnet: string
    CarnetEquivalente?: string
    Nombres: string
    Apellidos: string 
    Email: string
    Dui?: string
    Direccion?: string
    Cargo?: string
    IdFacultad: string
    NombreFacultad: string
    NombreCarrera: string
    FechaVencimientoCarnet?: string
    NombreMaestria?: string
    TipoContrato?: string
    Qr?: string
    Foto?: string
    Activo?: 1 | 0
    FechaRegistro: Date
    FechaModificacion: Date
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