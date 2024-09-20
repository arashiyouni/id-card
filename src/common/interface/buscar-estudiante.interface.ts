export interface BuscarEstudianteStrategy {
    buscarEstudiante(carnet: string)
}

export interface ResponseDataStudent {
    carnet: string
    nombres: string
    apellidos: string
    ciclo_ingreso: string
    email?: string
    sede?: string
    carrera?: string
    facultad: string
    idFacultad: string
    modalidad?: string
    proceso?: string
    ciclo_egreso?: string
    maestria?: string
    activo?: boolean
    fecha_activo?: string
}

export interface ResponseReingreso {
    carnet: string
    ciclo_actual: string
    ciclo_reingreso: string
    accion: number
    fecha_movimiento: string
    id_movimiento: number
}

export interface ResponseFotoCarnet {
    nombres: string
    apellidos: string
    foto: string
    idFacultad: number | string
    qr: string
    ciclo_carnet: string
}