import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppState } from '../../../../store/app.state';
import { UserTokenModel } from '../../../../models';
import { AuthService } from '../../../../services';
import { setUserToken } from '../../../../store/actions';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  @Output() componentOnEvent = new EventEmitter<boolean>();
  profileImgUrl: string = '../../../../assets/img/profile-img.png'
  userTokenModel?: UserTokenModel;
  selectedProfileImage?: File;

  errorMessage?: string
  requestOk: boolean = false;

  editForm = this.fb.group({
    userEmail: this.fb.nonNullable.control('',
      {
        validators: [Validators.required, Validators.email,
        Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+")]
      }),
    userFullname: this.fb.nonNullable.control('', [Validators.required]),
    userBio: this.fb.nonNullable.control('', []),
    userPhone: this.fb.nonNullable.control('', []),


  })

  constructor(
    private store: Store<AppState>,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.store.select('userToken')
      .subscribe((state) => {
        if (state.userToken) {
          const { userToken } = state

          this.userTokenModel = userToken

          this.editForm.patchValue({ userEmail: userToken.userEmail })
          this.editForm.patchValue({ userFullname: userToken.userFullname })
          this.editForm.patchValue({ userPhone: userToken.userPhone, })
          this.editForm.patchValue({ userBio: userToken.userBio })
          return;
        }
      })
  }

  sendComponentOn(): void {
    this.componentOnEvent.emit(true);
  }

  onFileSelected(event: any) {
    this.selectedProfileImage = event.target.files[0];
  }

  onUpload() {
    if(!this.userTokenModel || !this.selectedProfileImage) return;
    this.authService.uploadProfileImage(this.userTokenModel.userId, this.selectedProfileImage)
    .subscribe({
      next: (token: string) => {
        localStorage.setItem('authToken', token)
        const user = jwt_decode<UserTokenModel>(token);

        this.store.dispatch(setUserToken({ userToken: user }))
        this.requestOk = true
        setTimeout( () => {
          this.sendComponentOn()
        }, 1500)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);

      }
    })

  }

  changeUserInformation(): void {
    if (!this.userTokenModel) return;
    const { userId } = this.userTokenModel

    const { userEmail, userFullname, userBio, userPhone } = this.editForm.getRawValue()

    if (this.formValidation()) {
      this.authService.changePersonalInfo({userId, userEmail, userFullname, userBio, userPhone})
      .subscribe({
        next: (token: string) => {
          localStorage.setItem('authToken', token)
          const user = jwt_decode<UserTokenModel>(token);

          this.store.dispatch(setUserToken({ userToken: user }))
          this.requestOk = true
          setTimeout( () => {
            this.sendComponentOn()
          }, 1500)
        },
        error: (err: HttpErrorResponse) => {

        }
      })
    }

  }

  formValidation(): boolean {
    this.errorMessage = undefined;
    if (this.editForm.controls["userFullname"].errors) {
      this.errorMessage = "Name is required";
      return false;
    }
    if (this.editForm.controls["userEmail"].errors) {
      this.errorMessage = "Please enter a valid email"
      return false;
    }

    return true;
  }
}
