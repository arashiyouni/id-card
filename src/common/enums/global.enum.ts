export enum coloresQr {
    '01' = '#ff8002', // FACULTAD DE CIENCIAS SOCIALES
    '02' = '#0d3a70', // FACULTAD DE CIENCIAS ECONÓMICAS
    '03' = '#338f41', // FACULTAD DE INGENIERIA Y SISTEMAS
    '05' = '#cd005d', // ESTUDIANTE POSTGRADO
    '04' = '#683c6f', // FACULTAD DE CIENCIAS Y JURÍDICAS
    '08' = '#00a6b5', // FACULTAD DE FACULTAD DE ARTE Y DISEÑO
    'EGRESADO' = '#64656a' //EEGRESADO
}

export enum TipoEstudiante {
    PREGRADO = "PREGRADO",
    POSTGRADO = "POSTGRADO",
    EGRESADO = "EGRESADO"
}

export enum QueryTipoEstudiante {
    PREGRADO = "pregrado",
    POSTGRADO = "postgrado",
    EGRESADO = "egresado"
}

export enum ModuloCarnetizacion {
    pregrado = "carnetizacion-pre-grado",
    postgrado = "carnetizacion-post-grado",
    egresado = "carnetizacion-egresados"
}

export enum EstadoCarnet {
    notStart = 'Iniciado',
    inProgress = 'En progreso',
    Finish = 'Completado'
}