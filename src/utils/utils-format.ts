export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JS empiezan desde 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }


export function FormatData(data: any, tipoCarnet: string){

  //TODO: VER EL INGRESO DEL TERCER APELLIDO
  if(tipoCarnet === 'POSTGRADO' || tipoCarnet === 'EGRESADO' ){
    return {
      idalumno: data[0].alumno_idalumno || data[0].IdAlumno,
      email:  data[0].alumno_email || '',
      nombres:   data[0].alumno_nombres || data[0].IdAlumno,
      apellidos: `${data[0].alumno_apellido1} ${data[0].alumno_apellido2}` || `${data[0].Apellido1} ${data[0].Apellido2}`,
      nombre_carrera: data[0].carrera_nombre || data[0].Carrera,
      idfacultad: data[0].facultad_idfacultad || data[0].idFacultad, 
      nombre_facultad: data[0].facultad_nombre || data[0].Facultad,
      sede: data[0].carrera_sede || 1,
      activo:  1
    }
  }

  return {
    idalumno: data.estudiante.alumno_idalumno,
    email:  data.estudiante.alumno_email || '',
    nombres:   data.estudiante.nombres,
    apellidos: `${data.estudiante.alumno_apellido1}  ${data.estudiante.alumno_apellido2}`,
    nombre_carrera: data.estudiante.carrera_nombre,
    idfacultad: data.estudiante.facultad_idfacultad, 
    nombre_facultad: data.estudiante.facultad_nombre,
    sede: data.estudiante.carrera_sede,
    activo:  data.isActive.activo
  }
}