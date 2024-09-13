import { IEstudianteInformacion, IEgresadoInformacion } from "./sql/parameters/insertar-foto";


export interface ProcesarEstudianteStrategy {
    procesar(estudiante?: IEstudianteInformacion, egeresado?: IEgresadoInformacion)
}