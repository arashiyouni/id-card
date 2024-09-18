import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FetchHttpService {
    constructor(private readonly httpService: HttpService) { }

    async FetchTemplate(tipoCarnet: string, sede: string) {
        const url = "https://admisiones.ufg.edu.sv/tcarnetapis/api/v1/templateCard"
        const data = {
            TipoCarnet: tipoCarnet,
            IdFacultad: sede
        }
        try {
            const template = await lastValueFrom(this.httpService.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }))
            return template.data
        } catch (error) {
            throw new Error(`Error making POST request: ${error.message}`);
        }
    }
}
