import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from "mongoose";
import { IUserModel } from '../../domain/models/user.interface.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true, collection: 'users' })
export class User implements IUserModel {

    @Prop({ type: 'string', required: true, unique: true })
    userUID: string;

    @Prop({ type: 'string', required: true, default: 'User Full Name'})
    userFullname: string;
    
    @Prop({ type: 'string', required: false, max: 255, })
    userBio: string;
    
    @Prop({ type: 'string', required: true, unique: true })
    userEmail: string;
    
    @Prop({ type: 'string', required: true, min: 8 })
    userPassword: string;
    
    @Prop({ type: 'string', required: false })
    userPhone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);