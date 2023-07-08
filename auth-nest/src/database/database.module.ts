import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserRepository } from './repositories';
import { User, UserSchema } from './models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join('.env')
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository }
  ],
  exports: ['IUserRepository']
})
export class DatabaseModule { }
