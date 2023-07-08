import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { UserTokenModel } from '../../../../models';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  @Output() componentOnEvent = new EventEmitter<boolean>();
  profileImgUrl: string = '../../../../assets/img/profile-img.png'
  userTokenModel?: UserTokenModel;

  editForm = this.fb.group({
    userEmail: this.fb.nonNullable.control('',
      {
        validators: [Validators.required, Validators.email,
        Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+")]
      }),
    userFullname: this.fb.nonNullable.control('', []),
    userBio: this.fb.nonNullable.control('', []),
    userPhone: this.fb.nonNullable.control('', []),


  })

  constructor(
    private store: Store<AppState>,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.store.select('userToken')
      .subscribe((state) => {
        if (state.userToken) {
          const { userToken } = state

          this.userTokenModel = userToken

          this.editForm.patchValue({userEmail: userToken.userEmail})
          this.editForm.patchValue({userFullname: userToken.userFullname})
          this.editForm.patchValue({userPhone: userToken.userPhone,})
          this.editForm.patchValue({userBio: userToken.userBio})
          return;
        }
      })
  }

  sendComponentOn(): void {
    this.componentOnEvent.emit(true);
  }
}
