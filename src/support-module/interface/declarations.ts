//permite multiples tipos sin tener que especificar esos tipos de antemano
export interface RepositoryDB {
    insert()
    get(carnet: string)
    update()
}

export enum TipoCarnet {
    PREGRADO = "PREGRADO",
    POSTGRADO = "POSTGRADO",
    EGRESADO = "EGRESADO"
}

export interface sendImageParams {
    //TODO: DESCOMENTARIAR LOS ? PARA ADECUARLOS YA AL CODIGO
    Activo: number
    Apellidos: string
    Carnet: string
    CarnetEquivalente?: string
    Email: string
    //TODO: CAMBIR A QUE SI SE PUEDE INGRESAR
    FechaModificacion?: string
    //TODO: CAMBIR A QUE SI SE PUEDE INGRESAR
    FechaRegistro?: string
    Foto: string
    IdSede?: number
    Qr?: string
    TipoCarnet: string
    Token?: string
    CalificacionesFile?: string
    IdFacultad?: string
    InscripcionFile?: string
    CalificacionesFileName?: string
    // Seguimiento?: string
    NombreCarrera: string
    NombreFacultad: string
    Nombres: string
    CicloCarnetizacion: string
}

export interface StudentPhotoData {
   // activo: number;
   // apellidos: string;
    carnet: string;
    email: string;
    Foto: string; // Puedes cambiar a `Buffer` si se maneja como base64 en otros casos.
    TipoCarnet: string;
 //   Nombres: string;
 //   NombreFacultad: string;
 //   NombreCarrera: string;
    CicloCarnetizacion: string;
}
