import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { IUserInfoDTO, IUserLoginDTO, IUserModel, IUserPasswordDTO, IUserRegisterDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiUrl
  controller = 'user'

  constructor(
    private readonly http: HttpClient
  ) { }

  firebaseLogin(uid: string): Observable<string> {
    return this.http.get(`${this.url}/${this.controller}/firebase/${uid}`, { responseType: 'text' })
  }

  userRegister(data: IUserRegisterDTO): Observable<string> {
    return this.http.post(`${this.url}/${this.controller}/register`, data, { responseType: 'text' })
  }

  userLogin(data: IUserLoginDTO): Observable<string> {
    return this.http.post(`${this.url}/${this.controller}/login`, data, { responseType: 'text' })
  }

  changePersonalInfo(data: IUserInfoDTO): Observable<IUserModel> {
    return this.http.post<IUserModel>(`${this.url}/${this.controller}/change-personal-info`, data)
  }

  changePassword(data: IUserPasswordDTO): Observable<IUserModel> {
    return this.http.post<IUserModel>(`${this.url}/${this.controller}/change-password`, data)
  }
}
