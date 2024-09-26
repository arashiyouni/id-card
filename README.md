### Para correr el proyecto
```
npm run start:dev
```
### Para levantar la BD
```
docker-compose up -d
```

**✨ Notita dev ✨**
si voy a usar variables de entorno, tengo que descargar la dependencia"
```
npm install @nestjs/config
```
Y crear mi carpeta config para hacer la configuracion en el modulo principal

### Modelos y Base de datos 🐑
![alt text](assets/image.png)
### Idea de flujo 🛫
![alt text](assets/flujo.png)
### Stack y Task 👀
![alt text](assets/stack_task.png)

https://www.youtube.com/watch?v=h-68sqxycJY


--- 

## Consulta

```

SELECT  IdMovimientoa, cicloa, idalumno, idusuario, resolucion
from movimientoa
INNER JOIN tacciones
ON movimientoa.idaccion = tacciones.idaccion

```

---
Built-in Passport Guards#
The Guards chapter describes the primary function of Guards: to determine whether a request will be handled by the route handler or not. That remains true, and we'll use that standard capability soon. However, in the context of using the @nestjs/passport module, we will also introduce a slight new wrinkle that may at first be confusing, so let's discuss that now. Consider that your app can exist in two states, from an authentication perspective:

the user/client is not logged in (is not authenticated)
the user/client is logged in (is authenticated)

---
### Flujo de `acces_token` y `refresh_token`
![token flow](assets/flowToken.png)

---
Resource:
- [JWT Refresh Token](https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d)
- [JWT utilies Nest](https://github.com/nestjs/jwt)
- [Passport auth and passpor](https://fintech.theodo.com/blog-posts/implementing-authentication-in-nestjs-using-passport-and-jwt)

### Para hacer database first
```
npx typeorm-model-generator -h "192.168.98.20" -d RegistroAcademicoDev -p 1433 -u sa -x "5dZ8psbVg7mp6M" -e "mssql"
```

Después de generar las migraciones, se debe registrar las entidades en TypeORM

ref: [typeorm-model-generator](https://github.com/Kononnable/typeorm-model-generator) 



**TODO**
- Crear AUTH
- Documentar endpoint
- Documentar proyetco
- Ver como crear un mini entorno de desarrollo y que se persista la infor que tengo actualmente
- Pasarlo todo a produccion

Agregar el mimetype a la hora de guardar la foto
Convertidor de imagen=
https://base64.guru/converter/encode/image