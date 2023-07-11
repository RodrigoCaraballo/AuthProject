import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'

import { AppState } from '../../../../store/app.state';
import { UserTokenModel } from '../../../../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  colorSvg?: string;
  userFullname?: string;

  profileImgUrl: string = '../../../../assets/img/profile-img.png'
  logoDarkImageUrl: string = '../../../assets/img/devchallenges-light.svg'
  logoLightImageUrl: string = '../../../assets/img/devchallenges.svg'

  isClicked?: boolean = true;
  isDarkMode?: boolean;

  constructor(
    private store: Store<AppState>,
    private readonly router: Router
  ) { }


  ngOnInit() {
    this.store.select('userToken')
      .subscribe((state) => {
        if (state.userToken) {
          const { userToken } = state

          this.userFullname = userToken.userFullname
          if(userToken.userProfileImagePath) this.profileImgUrl = userToken.userProfileImagePath
          return;
        }

      })

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.checkDarkMode(darkModeQuery.matches);
    darkModeQuery.addEventListener('change', event => this.checkDarkMode(event.matches));

    if (this.isDarkMode) {
      this.colorSvg = '#ffffff';
      return;
    }
    this.colorSvg = '#000000';
  }

  checkDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }

  toggleMenu() {
    this.isClicked = !this.isClicked;
  }
}
