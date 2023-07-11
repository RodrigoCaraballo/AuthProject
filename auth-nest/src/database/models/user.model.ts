import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from "mongoose";
import { IUserModel } from '../../domain/models/user.interface.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true, collection: 'users' })
export class User implements IUserModel {

    @Prop({ type: 'string', required: true, unique: true })
    userUID: string;

    @Prop({ type: 'string', required: false,})
    userProfileImagePath?: string;

    @Prop({ type: 'string', required: false,})
    userFullname?: string;
    
    @Prop({ type: 'string', required: false, max: 255, default: ''})
    userBio?: string;
    
    @Prop({ type: 'string', required: true, unique: true })
    userEmail: string;
    
    @Prop({ type: 'string', required: true, min: 8 })
    userPassword?: string;
    
    @Prop({ type: 'string', required: false, default: '' })
    userPhone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);