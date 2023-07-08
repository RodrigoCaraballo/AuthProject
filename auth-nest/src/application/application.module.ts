import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [{provide: 'IUserService', useClass: UserService}],
  exports: ['IUserService']
})
export class ApplicationModule {}
