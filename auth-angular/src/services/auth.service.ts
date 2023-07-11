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

  changePersonalInfo(data: IUserInfoDTO): Observable<string> {
    return this.http.put(`${this.url}/${this.controller}/change-personal-info`, data, { responseType: 'text' })
  }

  changePassword(data: IUserPasswordDTO): Observable<boolean> {
    return this.http.put<boolean>(`${this.url}/${this.controller}/change-password`, data)
  }

  uploadProfileImage(userId: string, profileImage: File): Observable<string> {
    const formData = new FormData();
  formData.append('profileImage', profileImage, profileImage.name);
    return this.http.post(`${this.url}/${this.controller}/profile-image/${userId}`, formData, { responseType: 'text' })
  }
}
