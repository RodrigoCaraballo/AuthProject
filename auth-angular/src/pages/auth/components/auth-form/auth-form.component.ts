import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import jwt_decode from 'jwt-decode';

import { AuthService, FirebaseService } from '../../../../services';
import { IUserLoginDTO, IUserRegisterDTO, UserTokenModel } from '../../../../models';
import { AppState } from '../../../../store/app.state';
import { setUserToken } from '../../../../store/actions';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {

  @Input() btnText?: string;
  googleLogoUrl: string = '../../../assets/img/Google.svg'
  error?: Error;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  authForm = this.fb.group({
    userEmail: this.fb.nonNullable.control('',
      {
        validators: [Validators.required, Validators.email,
        Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+")]
      }),
    userPassword: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$'),] })
  })

  formData() {
    if (this.btnText === 'Login') {
      this.loginUser()
      return;
    }

    this.firebaseRegister()
  }

  private registerUser(data: IUserRegisterDTO) {
    this.authService.userRegister(data)
      .subscribe({
        next: (token: string) => {
          localStorage.setItem('authToken', token)
          const user = jwt_decode<UserTokenModel>(token);

          this.store.dispatch(setUserToken({ userToken: user }))
          this.router.navigate(['/profile']);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error;

          setTimeout(() => {
            this.error = undefined;
          }, 2000)
        }
      })
  }

  firebaseRegister() {
    const registerForm = this.authForm.getRawValue();

    this.firebaseService.register(registerForm.userEmail, registerForm.userPassword)
      .then((user: UserCredential) => {
        const newUser: IUserRegisterDTO = { userUID: user.user.uid, userEmail: registerForm.userEmail, userPassword: registerForm.userPassword }

        this.registerUser(newUser);
      })
      .catch((error: FirebaseError) => {
        this.error = error;

        setTimeout(() => {
          this.error = undefined;
        }, 2000)
      })
  }

  loginUser() {
    const loginForm = this.authForm.getRawValue();

    this.authService.userLogin(loginForm)
      .subscribe({
        next: (token: string) => {
          localStorage.setItem('authToken', token)
          const user = jwt_decode<UserTokenModel>(token);

          this.store.dispatch(setUserToken({ userToken: user }))
          this.router.navigate(['/profile']);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error;

          setTimeout(() => {
            this.error = undefined;
          }, 2000)
        }
      })
  }

  signInWithGoogle() {
    this.firebaseService.loginWithGoogle()
      .then((user: UserCredential) => {
        this.authService.firebaseLogin(user.user.uid)
          .subscribe({
            next: (token: string) => {
              localStorage.setItem('authToken', token)
              const user = jwt_decode<UserTokenModel>(token);

              this.store.dispatch(setUserToken({ userToken: user }))
              this.router.navigate(['/profile']);
            },
            error: (error: HttpErrorResponse) => {
              if(error.status === 404 && user.user.email) {
                this.registerUser({userUID: user.user.uid , userEmail: user.user.email, userPassword: undefined})
              }

              this.error = error;

              setTimeout(() => {
                this.error = undefined;
              }, 2000)
            }
          })
      })
      .catch((error: FirebaseError) => {
        this.error = error;

        setTimeout(() => {
          this.error = undefined;
        }, 2000)
      })
  }

}
