export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JS empiezan desde 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }


export function FormatoDatos(data: any, tipoCarnet: string){

  if(tipoCarnet === 'POSTGRADO' || tipoCarnet === 'EGRESADO' ){
    return {
      idalumno: data.carnet || data.carnet,
      email:  data.email|| '',
      nombres:   data.nombres,
      apellidos: data.apellidos,
      nombre_carrera: data.maestria|| data.carrera,
      idfacultad: data.idFacultad, 
      nombre_facultad: data.facultad,
      sede: data.sede|| 1,
      activo:  1
    }
  }

  return {
    idalumno: data.carnet,
    email:  data.email || '',
    nombres:   data.nombres,
    apellidos: data.apellidos,
    nombre_carrera: data.carrera,
    idfacultad: data.idFacultad, 
    nombre_facultad: data.facultad,
    sede: data.sede,
    activo:  data.activo
  }
}