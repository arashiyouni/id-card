export interface getstudentParametersImage {
   carnet: string;
   email: string;
   Foto: string; 
   TipoCarnet: string;
   CicloCarnetizacion: string;
}

export interface IEnviarFotoCarnet {
    Token: string
    Activo: number | boolean
    Apellidos: string
    CarnetEquivalente: string
    Carnet: string
    Email: string
    FechaModificacion: Date
    FechaRegistro: Date
    Foto: string
    IdSede: number | string
    Qr: string
    TipoCarnet: string
    NombreFacultad: string
    NombreCarrera: string
    Nombres: string
    CicloCarnetizacion: string
    IdFacultad: string
}