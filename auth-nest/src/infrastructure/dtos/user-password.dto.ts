import { IsString, IsNotEmpty } from 'class-validator';

import { IUserPasswordDTO } from "../../domain";

export class UserPasswordDTO implements IUserPasswordDTO {
    @IsString({message: 'userId must be a string'})
    @IsNotEmpty({message: 'userId must not be empty'})
    userId: string;
    
    @IsString({message: 'userPassword must be a string'})
    @IsNotEmpty({message: 'userPassword must not be empty'})
    userPassword: string;
    
    @IsString({message: 'userNewPassword must be a string'})
    @IsNotEmpty({message: 'userNewPassword must not be empty'})
    userNewPassword: string;

}