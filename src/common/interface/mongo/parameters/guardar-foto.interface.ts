export interface getstudentParametersImage {
   carnet: string;
   email: string;
   Foto: string; 
   TipoCarnet: string;
   CicloCarnetizacion: string;
}

export interface sendImageParams{
    Token: string
    Activo: number
    Apellidos: string
    CarnetEquivalente: string
    Carnet: string
    Email: string
    FechaModificacion: Date
    FechaRegistro: Date
    Foto: string
    IdSede: number
    Qr: string
    TipoCarnet: string
    NombreFacultad: string
    NombreCarrera: string
    Nombres: string
    CicloCarnetizacion: string
    IdFacultad: string
}