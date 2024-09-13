export interface FotoHexa {
    carnet: string
    length: number
    idSede: number | string
    foto: any
    date: Date
}

export interface IEstudianteInformacion {
	token: string,
	activo?: boolean | number,
	alumno_apellidos: string,
	carnetEquivalente: string,
	alumno_idalumno: string,
	alumno_email: string,
	foto: string,
	idsede: string,
	tipoCarnet: string,
	facultad_nombre: string,
	carrera_nombre: string,
	nombres:string,
	CicloCarnetizacion: string,
	facultad_idfacultad: string
}
//
export interface IEgresadoInformacion {
	IdAlumno: string
	Nombres: string
	Apellido1: string
	Apellido2: string
	Apellido3: string
	CicloIngre: string
	Carrera: string
	Facultad: string
	Modalidad: string
	Proceso: string
	CicloEgreso: string
}