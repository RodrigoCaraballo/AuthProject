import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    InfrastructureModule,
    MulterModule.register({ dest: './uploads' })
  ],
})
export class AppModule { }
