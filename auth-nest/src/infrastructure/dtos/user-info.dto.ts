import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { IUserInfoDTO } from "../../domain";

export class UserInfoDTO implements IUserInfoDTO {

    @IsString({message: 'userId must be a string'})
    @IsNotEmpty({message: 'userId must not be empty'})
    userId: string;
    @IsString({message: 'userFullname must be a string'})
    @IsOptional()
    userFullname?: string;

    @IsString({message: 'userBio must be a string'})
    @IsOptional()
    userBio?: string;
    
    @IsString({message: 'userEmail must be a string'})
    @IsOptional()
    userEmail?: string;

    @IsString({message: 'userPhone must be a string'})
    @IsOptional()
    userPhone?: string;

}