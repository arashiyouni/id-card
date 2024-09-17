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
	nombres:string,
	apellidos: string,
	carnet_equivalente: string,
	carnet: string,
	email: string,
	foto: string,
	idsede: string,
	tipo_carnet: string,
	facultad: string,
	carrera: string,
	ciclo_carnetizacion: string,
	idfacultad: string
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