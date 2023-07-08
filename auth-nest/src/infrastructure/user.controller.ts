import { Body, Controller, Get, HttpException, Inject, Param, Post, Put, Res } from "@nestjs/common";
import { IUserModel, IUserService } from "../domain";
import { Observable, catchError, from, map, of } from "rxjs";
import { UserInfoDTO, UserLoginDTO, UserPasswordDTO, UserRegisterDTO } from "./dtos";

@Controller('user')
export class UserController {

    constructor(
        @Inject('IUserService') private readonly userService: IUserService
    ) { }

    @Get('firebase/:uid')
    firebaseLoginByUID(@Param('uid') uid: string): Observable<string> {
        return this.userService.firebaseLoginByUID(uid)
            .pipe(
                map((token: string) => token),
                catchError((error: HttpException) => { throw error })
            )
    }

    @Post('register')
    firebaseRegister(@Body() data: UserRegisterDTO): Observable<string> {
        return from(this.userService.firebaseRegister(data)
            .pipe(
                map((token: string) => token),
                catchError((error: HttpException) => { throw error })
            ))
    }

    @Post('login')
    firebaseLogin(@Body() data: UserLoginDTO): Observable<string> {
        return this.userService.firebaseLogin(data)
            .pipe(
                map((token: string) => token),
                catchError((error: HttpException) => { throw error })
            )
    }

    @Put('change-personal-info')
    changePersonalInfo(@Body() data: UserInfoDTO): Observable<IUserModel> {
        return this.userService.changePersonalInfo(data)
            .pipe(
                map((user: IUserModel) => user),
                catchError((error: HttpException) => { throw error })
            )
    }

    @Put('change-password')
    changePassword(@Body() data: UserPasswordDTO): Observable<IUserModel> {
        return this.userService.changePassword(data)
            .pipe(
                map((user: IUserModel) => user),
                catchError((error: HttpException) => { throw error })
            )
    }

}