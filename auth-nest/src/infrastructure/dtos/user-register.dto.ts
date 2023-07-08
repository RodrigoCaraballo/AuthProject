import { IsString, IsNotEmpty, IsOptional } from "class-validator";

import { IUserRegisterDTO } from "../../domain";

export class UserRegisterDTO implements IUserRegisterDTO {
    @IsString({message: 'userUID must be a string'})
    @IsNotEmpty({message: 'userUID must not be empty'})
    userUID: string;

    @IsString({message: 'userFullname must be a string'})
    @IsOptional()
    userFullname?: string;

    @IsString({message: 'userBio must be a string'})
    @IsOptional()
    userBio?: string;

    @IsString({message: 'userEmail must be a string'})
    @IsNotEmpty({message: 'userEmail must not be empty'})
    userEmail: string;

    @IsString({message: 'userPassword must be a string'})
    @IsOptional()
    userPassword?: string;

    @IsString({message: 'userPhone must be a string'})
    @IsOptional()
    userPhone?: string;

}