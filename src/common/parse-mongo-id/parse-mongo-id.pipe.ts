import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
    //retorna `true` si encuentra el mongo id
    if(!isValidObjectId(value)) throw new BadRequestException(`${value} is not valid MongoID`)
    return value.toUpperCase();
  }
}
