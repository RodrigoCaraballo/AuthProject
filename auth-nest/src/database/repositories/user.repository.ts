import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Observable, catchError, from, map, switchMap } from "rxjs";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import { User, UserDocument } from "../models/user.model";
import { IUserRepository } from "../../domain/repositories";
import { IUserModel } from "../../domain/models";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly repository: Model<UserDocument>

    ) { }

    createUser(user: IUserModel): Observable<IUserModel> {
        return from(this.repository.create(user))
            .pipe(
                map((user: User) => user),
                catchError(() => { throw new ConflictException() })
            )
    }
    editUser(userId: string, user: IUserModel): Observable<IUserModel> {
        return from(this.repository.findByIdAndUpdate(userId, user, {new: true}))
            .pipe(
                map((user: User) => user),
                catchError(() => { throw new ConflictException() })
            )
    }
    findUserById(userId: string): Observable<IUserModel> {
        return from(this.repository.findById(userId))
            .pipe(
                map((user: User) => user),
                catchError(() => { throw new NotFoundException() })
            )
    }
    findUserByUID(uid: string): Observable<IUserModel> {
        return from(this.repository.findOne({ userUID: uid }))
            .pipe(
                map((user: User) =>  {
                    if (!user) throw new NotFoundException();
                    
                    return user;
                }),
                catchError(() => { throw new NotFoundException() })
            )
    }

    findUserByEmail(email: string): Observable<IUserModel> {
        return from(this.repository.findOne({ userEmail: email }))
            .pipe(
                map((user: User) => user),
                catchError(() => { throw new NotFoundException() })
            )
    }
}