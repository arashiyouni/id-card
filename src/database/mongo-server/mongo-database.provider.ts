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
    {
        provide: AuthService,
        useFactory: (
            RefreshToken: Model<RefreshToken>,
            userService: UsersService,
            jwtService: JwtService
        ) => {
            return new AuthService(RefreshToken, userService, jwtService)
        },
        inject: [getConnectionToken(RefreshToken.name), UsersService, JwtService]
    }
]

export const mongoseProvider = [
    {
        provide: 'MONGO_OPERA',
        useFactory: (): Promise<typeof mongoose> => mongoose.connect("mongodb://localhost:27018/carnetizacionOpera003")
    }
]