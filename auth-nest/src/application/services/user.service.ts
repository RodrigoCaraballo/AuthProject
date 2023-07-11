import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Observable, catchError, from, map, switchMap, tap } from "rxjs";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as streamifier from 'streamifier';

import { cloudinary, deleteOldImage, verifyImage } from '../utils/cloudinary.helper';
import { IUserRegisterDTO, IUserLoginDTO, IUserInfoDTO, IUserPasswordDTO, IUserModel, IUserService, IUserRepository } from "../../domain";
import { clearFilesFolder, generateRandomPassword, getFullname } from "../utils/helper";
import { UploadApiResponse } from "cloudinary";

@Injectable()
export class UserService implements IUserService {

    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository
    ) { }

    firebaseLoginByUID(uid: string): Observable<string> {
        return this.userRepository.findUserByUID(uid)
            .pipe(
                map((user: IUserModel) => {
                    return this.generateToken(user)
                }),
                catchError((error) => {
                    if (error) throw error
                    throw new InternalServerErrorException()
                })
            )
    }
    firebaseRegister(data: IUserRegisterDTO): Observable<string> {
        const { userPassword } = data

        return from(bcrypt.hash(userPassword || generateRandomPassword(), parseInt(process.env.SALT_ROUNDS)))
            .pipe(
                switchMap((hashedPassword: string) => {
                    data.userPassword = hashedPassword;

                    if (!data.userFullname) data.userFullname = getFullname(data.userEmail);
                    return this.userRepository.createUser(data)
                        .pipe(
                            map((user: IUserModel) => {
                                return this.generateToken(user)
                            }),
                            catchError((error) => {
                                if (error) throw error
                                throw new InternalServerErrorException()
                            })
                        )
                }),
                catchError((error) => {
                    if (error) throw error
                    throw new InternalServerErrorException()
                })
            )
    }
    firebaseLogin(data: IUserLoginDTO): Observable<string> {
        return this.userRepository.findUserByEmail(data.userEmail)
            .pipe(
                switchMap((user: IUserModel) => {
                    return from(bcrypt.compare(data.userPassword, user.userPassword))
                        .pipe(
                            map((value: boolean) => {
                                if (value) {
                                    return this.generateToken(user)
                                }
                                throw new UnauthorizedException();
                            })
                        )
                }),
                catchError((error) => {
                    if (error) throw error
                    throw new InternalServerErrorException()
                })
            )
    }
    changePersonalInfo(data: IUserInfoDTO): Observable<string> {
        return this.userRepository.findUserById(data.userId)
            .pipe(
                switchMap((user: IUserModel) => {
                    if (data.userBio) user.userBio = data.userBio
                    if (data.userEmail) user.userEmail = data.userEmail
                    if (data.userFullname) user.userFullname = data.userFullname
                    if (data.userPhone) user.userPhone = data.userPhone

                    return from(this.userRepository.editUser(data.userId, user))
                        .pipe(
                            map((editedUser: IUserModel) => {
                                return this.generateToken(editedUser)
                            }),
                            catchError(() => { throw new InternalServerErrorException() })
                        )
                }),
                catchError((error) => {
                    if (error) throw error
                    throw new InternalServerErrorException()
                })
            )
    }
    changePassword(data: IUserPasswordDTO): Observable<boolean> {
        return this.userRepository.findUserById(data.userId)
            .pipe(
                switchMap((user: IUserModel) => {
                    return from(bcrypt.compare(data.userPassword, user.userPassword))
                        .pipe(
                            switchMap((value: boolean) => {
                                if (value) {
                                    return from(bcrypt.hash(data.userNewPassword, parseInt(process.env.SALT_ROUNDS)))
                                        .pipe(
                                            switchMap((hashedPassword: string) => {
                                                user.userPassword = hashedPassword;
                                                return from(this.userRepository.editUser(data.userId, user))
                                                    .pipe(
                                                        map((user: IUserModel) => user._id ? true : false),
                                                        catchError(() => { throw new InternalServerErrorException() })
                                                    )
                                            }),
                                            catchError((error) => {
                                                if (error) throw error
                                                throw new InternalServerErrorException()
                                            })
                                        )
                                }

                                throw new UnauthorizedException()
                            }),
                            catchError((error) => {
                                if (error) throw error
                                throw new InternalServerErrorException()
                            })
                        )
                }),
                catchError((error) => {
                    if (error) throw error
                    throw new InternalServerErrorException()
                })
            )
    }

    uploadProfileImage(profileImage: Express.Multer.File, userId: string): Observable<string> {
        return verifyImage(profileImage.path)
        .pipe( 
            switchMap((response: boolean) => {
                if(!response) throw new InternalServerErrorException()
                return from(cloudinary.uploader.upload(profileImage.path, {
                    resource_type: 'auto',
                    chunk_size: 6000000
                })).pipe(
                        switchMap((value: UploadApiResponse) => {
                            return this.userRepository.findUserById(userId)
                                .pipe(
                                    switchMap((user: IUserModel) => {
                                        let oldImage;
        
                                        if (user.userProfileImagePath) {
        
                                            deleteOldImage(user.userProfileImagePath)
                                        }
        
                                        user.userProfileImagePath = value.secure_url;
                                        return this.userRepository.editUser(userId, user)
                                            .pipe(
                                                map((editedUser: IUserModel) => {
        
                                                    return this.generateToken(editedUser);
                                                }),
                                                tap(() => {
                                                    clearFilesFolder(profileImage.path)
                                                }),
                                                catchError((error) => {
                                                    if (error) throw error
                                                    throw new InternalServerErrorException()
                                                })
                                            )
                                    }),
                                    catchError((error) => {
                                        if (error) throw error
                                        throw new InternalServerErrorException()
                                    })
                                )
                        }),
                        catchError((error) => {
                            if (error) throw error
                            throw new InternalServerErrorException()
                        })
                    );
            })
        )
    }

    private generateToken(user: IUserModel): string {
        const { userUID, userProfileImagePath, userEmail, userFullname, userBio, userPhone } = user;
        const payload = {
            userId: user._id,
            userUID,
            userProfileImagePath,
            userEmail,
            userFullname,
            userBio,
            userPhone
        }
        return jwt.sign(payload, process.env.SECRET_TOKEN)
    }
}