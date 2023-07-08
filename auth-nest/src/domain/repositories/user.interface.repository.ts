import { Observable } from "rxjs";

import { IUserModel } from "../models/user.interface.model";

export interface IUserRepository {
    createUser(user: IUserModel): Observable<IUserModel>;
    editUser(userId: string, user: IUserModel): Observable<IUserModel>;
    findUserById(userId: string): Observable<IUserModel>;
    findUserByUID(uid: string): Observable<IUserModel>;
    findUserByEmail(email: string): Observable<IUserModel>;
}