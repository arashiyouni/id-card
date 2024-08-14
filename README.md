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
TODO:
https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d
https://github.com/nestjs/jwt
https://mongoosejs.com/docs/api/document.html#Document.prototype.toObject()
https://www.epochconvert.com/
https://jwt.io/

Ver como es la validacion y la accion de los dos tokens


https://github.com/vercel/ms
https://fintech.theodo.com/blog-posts/implementing-authentication-in-nestjs-using-passport-and-jwt
SALIOOOO