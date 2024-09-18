import { Module } from '@nestjs/common';
import { FetchHttpService } from './fetch-http.service';

@Module({
  providers: [FetchHttpService]
})
export class FetchHttpModule {}
