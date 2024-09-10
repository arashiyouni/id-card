export interface QRSchema extends Document {
    TokenQr: string
    IdSede: number,
    CicloCarnetizacion: string,
    TipoCarnet: string,
    Carnet: string,
    Qr: string,
    Activo: number,
    FechaRegistro: Date,
    FechaModificacion: Date,
}