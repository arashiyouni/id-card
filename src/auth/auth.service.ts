import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {

  async signup(createSignUpAuthDto: SignUpDto) {
    //check if email is in use
    // hash password
    // create document and save in mongodb
    return 'This action adds a new auth';
  }
}
