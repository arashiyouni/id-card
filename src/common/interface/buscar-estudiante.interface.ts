
export interface BuscarEstudianteStrategy {
    buscarEstudiante(carnet: string)
}

export interface DataTransform {
    idalumno: string
    email: string
    nombres: string
    apellido1: string
    apellido2: string
    nombre_carrera: string
    idfacultad: string
    nombre_facultad: string
    sede: string
    activo?: boolean | number
}