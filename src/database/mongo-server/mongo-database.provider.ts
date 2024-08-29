import { getConnectionToken } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";


export const UserProvider = [
    {
        provide: UsersService,
        useFactory: (userConnection: Model<User>) => {
            return new UsersService(userConnection)
        },
        inject: [getConnectionToken(User.name)]
    }
]