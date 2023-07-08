import { IUserLoginDTO } from "../../domain";
import { IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDTO implements IUserLoginDTO {

    @IsString({message: 'userEmail must be a string'})
    @IsNotEmpty({message: 'userEmail must be a not empty'})
    userEmail: string;
    
    @IsString({message: 'userPassword must be a string'})
    @IsNotEmpty({message: 'userPassword must be a not empty'})
    userPassword: string;

}