import { Observable } from "rxjs";

import { IUserInfoDTO, IUserLoginDTO, IUserPasswordDTO, IUserRegisterDTO } from "../dto";
import { IUserModel } from "../models";

export interface IUserService {
    firebaseLoginByUID(uid: string): Observable<string>;
    firebaseRegister(data: IUserRegisterDTO): Observable<string>;
    firebaseLogin(data: IUserLoginDTO): Observable<string>;
    changePersonalInfo(data: IUserInfoDTO): Observable<string>;
    changePassword(data: IUserPasswordDTO): Observable<boolean>;
    uploadProfileImage(profileImage: Express.Multer.File, userId: string): Observable<string>;
}