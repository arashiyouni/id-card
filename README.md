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
Built-in Passport Guards#
The Guards chapter describes the primary function of Guards: to determine whether a request will be handled by the route handler or not. That remains true, and we'll use that standard capability soon. However, in the context of using the @nestjs/passport module, we will also introduce a slight new wrinkle that may at first be confusing, so let's discuss that now. Consider that your app can exist in two states, from an authentication perspective:

the user/client is not logged in (is not authenticated)
the user/client is logged in (is authenticated)

---
### Flujo de `acces_token` y `refresh_token`
![token flow](assets/flowToken.png)

---
TODO:
- HACER LOS DEMÁS ENDPOINT Y DEJAR POR ULTIMO LA AUTORIZACION
Endpoint a trabajar:
- Ver carnet:
    - Titulo de universidad
    - ciclo
    - Carrera
    - Nombre
    - Carnet
    - QR
    - Imagen
A partir de eso, que necesitaria para ingresar el carnet?
- Insertar Informacion de carnet:
    - imagen
    - sede
    - tipo carnet
    - nombre
    - carrera
    - facultad
    - idfacultad

Puntos que creo que hay que investigar sobre la marcha
    - ¿Cómo guardar las imagenes en nest?
    - ¿Cómo generar el token?
    - Si los carnet son templates, como llamarlos?
¿Qué podrá ser un admin?
    - Ver la fotografia
    - Enviar comentarios
    - Rechazar la foto
    - Aceptar la foto
    - Insertar fecha de vencimiento para carnet (aunque no es asi)
¿Qué pasaría si la foto es rechaza en el panel del estudiante?
    - Se le mostraria el comentario del admin
    - Se insertaria solo la fotografia
    - Se enviaría
¿Si hay necesidad de hacer un endpoint para el QR, que se mostraría?
    - carnet
    - carrera
    - facultad
    - idfacultad
    - nombre completo
    - DUI
Reto de ultimo:
- Ver como generar pdf para constancia de notas
- Ver como generar comprobante de inscripción

---
Resource:
- [JWT Refresh Token](https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d)
- [JWT utilies Nest](https://github.com/nestjs/jwt)
- [Passport auth and passpor](https://fintech.theodo.com/blog-posts/implementing-authentication-in-nestjs-using-passport-and-jwt)

