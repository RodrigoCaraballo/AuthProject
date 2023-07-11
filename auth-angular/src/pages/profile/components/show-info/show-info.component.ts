import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app.state';
import { UserTokenModel } from 'src/models';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  @Output() componentOnEvent = new EventEmitter<boolean>();
  profileImgUrl: string = '../../../../assets/img/profile-img.png'
  userTokenModel?: UserTokenModel;
  changePasswordOn: boolean = false;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('userToken')
    .subscribe((state) => {
      if (state.userToken) {
        const { userToken } = state

        this.userTokenModel = userToken
        if(this.userTokenModel.userProfileImagePath) this.profileImgUrl = this.userTokenModel.userProfileImagePath
        return;
      }

    })
  }

  sendComponentOn(): void {
    this.componentOnEvent.emit(false);
  }

  showModal(): void {
    this.changePasswordOn = true;
  }

  reciveComponentOn($event: boolean): void {
    this.changePasswordOn = $event
  }
}
