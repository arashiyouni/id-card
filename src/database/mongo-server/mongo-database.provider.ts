import { JwtService } from "@nestjs/jwt";
import { getConnectionToken } from "@nestjs/mongoose";
import mongoose, { Connection, Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { RefreshToken } from "src/auth/schemas/refresh-token.schemas";
import { User } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";


export const UserProvider = [
    // {
    //     provide: UsersService,
    //     useFactory: (userConnection: Model<User>) => {
    //         return new UsersService(userConnection)
    //     },
    //     inject: [getConnectionToken(User.name)]
    // },
    // {
    //     provide: AuthService,
    //     useFactory: (
    //         RefreshToken: Model<RefreshToken>,
    //         userService: UsersService,
    //         jwtService: JwtService
    //     ) => {
    //         return new AuthService(RefreshToken, userService, jwtService)
    //     },
    //     inject: [getConnectionToken(RefreshToken.name), UsersService, JwtService]
    // }
]

export const MongoProvider = [
    {
      provide: 'MONGO_OPERA',
      useFactory: async (): Promise<typeof mongoose> => {
        try {
          const connection = await mongoose.connect('mongodb://localhost:27018/carnetizacionOpera003');
          console.log('🍏 | MongoDB <carnetizacionOpera003> connection established 🎉');
          return connection;
        } catch (error) {
          // Mensaje para indicar que ocurrió un error al conectar
          console.error('🚩🍏 | MongoDB <carnetizacionOpera003> connection failed 😭:', error.message);
          throw error; // Opcional: Puedes lanzar el error para que el flujo de la aplicación se detenga
        }
      },
    },
  ];