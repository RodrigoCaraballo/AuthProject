import { Body, Controller, Get, HttpException, Inject, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { IUserService } from "../domain";
import { Observable, catchError, from, map } from "rxjs";
import { FileInterceptor } from "@nestjs/platform-express";

import { UserInfoDTO, UserLoginDTO, UserPasswordDTO, UserRegisterDTO } from "./dtos";
import { diskStorage } from "multer";
import { extname } from "path";

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
    changePersonalInfo(@Body() data: UserInfoDTO): Observable<string> {
        return this.userService.changePersonalInfo(data)
            .pipe(
                map((token: string) => token),
                catchError((error: HttpException) => { throw error })
            )
    }

    @Put('change-password')
    changePassword(@Body() data: UserPasswordDTO): Observable<boolean> {
        return this.userService.changePassword(data)
            .pipe(
                map((updated: boolean) => updated),
                catchError((error: HttpException) => { throw error })
            )
    }

    @Post('profile-image/:userId')
    @UseInterceptors(FileInterceptor('profileImage', {
        storage: diskStorage({
            destination: './temp',
            filename: (req, profileImage, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(profileImage.originalname);
                const newOriginalName = profileImage.originalname.replace(' ', '')
                const filename = `${newOriginalName}-${uniqueSuffix}${ext}`
                cb(null, filename)
            }
        })
    }))
    uploadFotoPerfil(@UploadedFile() profileImage: Express.Multer.File, @Param('userId') userId: string): Observable<string> {
        return this.userService.uploadProfileImage(profileImage, userId)
            .pipe(
                map((token: string) => token),
                catchError((error: HttpException) => { throw error })
            )
    }

}