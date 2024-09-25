import { ModuloCarnetizacion, QueryTipoEstudiante } from "src/common/enums/global.enum";

export function formatDate(date: Date): string {
  const allMonth = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth()); // Los meses en JS empiezan desde 0
  const year = date.getFullYear();

  return `${day} de ${allMonth[month]}, ${year}`;
}


export function FormatoDatos(data: any, tipoCarnet: string) {

  if (tipoCarnet === 'POSTGRADO' || tipoCarnet === 'EGRESADO') {
    return {
      idalumno: data.carnet || data.carnet,
      email: data.email || '',
      nombres: data.nombres,
      apellidos: data.apellidos,
      nombre_carrera: data.maestria || data.carrera,
      idfacultad: data.idFacultad,
      nombre_facultad: data.facultad,
      sede: data.sede || 1,
      activo: 1
    }
  }

  return {
    idalumno: data.carnet,
    email: data.email || '',
    nombres: data.nombres,
    apellidos: data.apellidos,
    nombre_carrera: data.carrera,
    idfacultad: data.idFacultad,
    nombre_facultad: data.facultad,
    sede: data.sede,
    activo: data.activo
  }
}

export function obtenerDescripcionMatricula(tipoCarnet: string): string {
  if (tipoCarnet === 'PREGRADO') return 'MATRICULA';
  if (tipoCarnet === 'POSTGRADO') return 'MATRICULA POSTGRADO 1/4';
  return '';
}

export const tipoModulo: {[Key in QueryTipoEstudiante]: ModuloCarnetizacion} = {
  pregrado: ModuloCarnetizacion.pregrado,
  postgrado: ModuloCarnetizacion.postgrado,
  egresado: ModuloCarnetizacion.egresado
}