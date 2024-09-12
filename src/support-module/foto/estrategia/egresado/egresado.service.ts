import { Injectable } from '@nestjs/common';
import { ProcesarEstudianteStrategy } from 'src/common/interface/guardar.foto';
import { IEstudianteInformacion, IEgresadoInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { QrService } from 'src/support-module/qr/qr-code.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';

@Injectable()
export class EgresadoService  implements ProcesarEstudianteStrategy {
    constructor(
        private readonly guardarFotoCarnetRepository: FotoCarnet,
        private readonly qr: QrService,
        private readonly carnetQrRepository: FotoCarnet,
    ){}
    procesar(estudiante?: IEstudianteInformacion, egeresado?: IEgresadoInformacion) {
        throw new Error('Method not implemented.');
    }   
}
