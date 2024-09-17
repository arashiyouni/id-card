import mongoose, { Connection  } from "mongoose";

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
          const connection = await mongoose.connect('mongodb://localhost:27017/carnetizacionOpera003');
          console.log('🍏 | MongoDB <carnetizacionOpera003> connection established 🎉');
          return connection;
        } catch (error) {
          console.error('🚩🍏 | Error conectando a MongoDB 😭:', error.message);
          throw error;
        }
      },
    },
  ];