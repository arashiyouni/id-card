import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SupportModuleModule } from 'src/support-module/support-module.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    //MongooseModule.forFeature([{name: User.name, schema: UserSchema}], 'USER'),
    //TODO: EL AUTH SE DEBE APLICAR DE ULTIMO
    //AuthModule
   // forwardRef(()=> AuthModule)
   SupportModuleModule,
   MulterModule.register({
    dest: '.uploads'
   })
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
