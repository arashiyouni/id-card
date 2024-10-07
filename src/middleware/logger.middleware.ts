import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';


export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger(LoggerMiddleware.name)
    constructor() { }

    use(req: Request, res: Response, next: NextFunction): void {
        const { ip, method, originalUrl: url } = req
        const userAgent = res.get('user-agent') || ''
        const startTime = Date.now()
        //aqui el Middleware "consume" el evento close: Aquí es donde puede haber confusión. El middleware no consume la respuesta antes del controlador; lo que está haciendo es agregar un listener al evento close del objeto res.
        res.on('close', () => {
            /**
             * El evento close ocurre después de que el cliente ha recibido la respuesta, lo que significa que el middleware solo registra los logs después de que el ciclo de vida completo de la solicitud ha terminado.
             * 
             * - Se ejecuta hasta que el controlador ha terminado su trabajo

             */
            const { statusCode } = res
            const contentLength = res.get('content-length')
            const endTime = Date.now()
            const responseTime = endTime - startTime

            this.logger.log(
                `
                🤘 | ${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} - Response: ${responseTime}ms
                `
            )
        })
        req['customData'] = {
            requestTime: new Date().toISOString(),
            trustedIp: req.ip === '127.0.0.1' ? true : false, 
        };
        next(); // Llama al siguiente middleware o controlador
    }

}