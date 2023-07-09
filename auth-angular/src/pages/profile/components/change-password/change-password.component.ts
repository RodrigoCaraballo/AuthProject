import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AppState } from '../../../../store/app.state';
import { AuthService } from '../../../../services';
import { UserTokenModel } from '../../../../models';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Output() componentOnEvent = new EventEmitter<boolean>();
  userTokenModel?: UserTokenModel;
  errorMessage?: string;
  requestOk: boolean = false;

  constructor(
    private store: Store<AppState>,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.store.select('userToken')
      .subscribe((state) => this.userTokenModel = state.userToken ? state.userToken : undefined)
  }

  changePasswordForm = this.fb.group({
    userPassword: this.fb.nonNullable.control('', [Validators.required]),
    userNewPassword: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
    confirmNewPassword: this.fb.nonNullable.control('', [Validators.required]),
  })

  sendComponentOn(): void {
    this.componentOnEvent.emit(false);
  }

  changeUserPassword(): void {
    this.errorMessage = undefined;
    if (this.controlForm()) {
      if (!this.userTokenModel) return;
      const { userId } = this.userTokenModel;
      const { userPassword, userNewPassword } = this.changePasswordForm.getRawValue();

      this.authService.changePassword({ userId, userPassword, userNewPassword })
        .subscribe({
          next: (value: boolean) => {
            if (!value) {
              this.errorMessage = "Updated failed, please try again";
              return;
            }

            this.requestOk = value;
            setTimeout( () => {
              this.sendComponentOn()
            }, 1500)
          },
          error: (error: HttpErrorResponse) => {

          }
        })
    }

  }

  private controlForm(): boolean {
    const { userNewPassword: newPassword, confirmNewPassword } = this.changePasswordForm.getRawValue();

    if (this.changePasswordForm.controls['userPassword'].errors) {
      this.errorMessage = "Please enter your current password";
      return false;
    }

    if (this.changePasswordForm.controls['userNewPassword'].errors) {
      this.errorMessage = "Your new password must have at least 6 character";
      return false;
    }

    if (this.changePasswordForm.controls['confirmNewPassword'].errors) {
      this.errorMessage = "Please confirm your new password";
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      this.errorMessage = "New password not match with the confirmation";
      return false;
    }

    return true;
  }
}
