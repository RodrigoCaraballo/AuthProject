import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, catchError, from, map, switchMap } from "rxjs";

import { User, UserDocument } from "../models/user.model";
import { IUserRepository } from "../../domain/repositories";
import { IUserModel } from "../../domain/models";

export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly repository: Model<UserDocument>

    ) { }

    createUser(user: IUserModel): Observable<IUserModel> {
        return from(this.repository.findOne({ userUID: user.userUID }))
            .pipe(
                switchMap((user: IUserModel) => {
                    if (user) throw new Error('Email already in use')

                    return from(this.repository.create(user))
                        .pipe(
                            map((user: IUserModel) => user),
                            catchError((error: Error) => { throw error })
                        )
                })
            )
    }
    editUser(userId: string, user: IUserModel): Observable<IUserModel> {
        return from(this.repository.findByIdAndUpdate(userId, user))
            .pipe(
                map((user: IUserModel) => user),
                catchError((error: Error) => { throw error })
            )
    }
    findUserById(userId: string): Observable<IUserModel> {
        return from(this.repository.findById(userId))
            .pipe(
                map((user: IUserModel) => user),
                catchError((error: Error) => { throw error })
            )
    }
    findUserByUID(uid: string): Observable<IUserModel> {
        return from(this.repository.findOne({ userUID: uid }))
            .pipe(
                map((user: IUserModel) => user),
                catchError((error: Error) => { throw error })
            )
    }
}