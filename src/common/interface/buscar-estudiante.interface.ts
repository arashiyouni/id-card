
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