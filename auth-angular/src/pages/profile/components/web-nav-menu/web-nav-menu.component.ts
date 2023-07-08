import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-nav-menu',
  templateUrl: './web-nav-menu.component.html',
  styleUrls: ['./web-nav-menu.component.css']
})
export class WebNavMenuComponent implements OnInit {

  colorSvg?: string;

  profileImgUrl: string = '../../../../assets/img/profile-img.png'
  logoDarkImageUrl: string = '../../../assets/img/devchallenges-light.svg'
  logoLightImageUrl: string = '../../../assets/img/devchallenges.svg'


  @Input() isClicked?: boolean = true;
  isDarkMode?: boolean;

  constructor(
    private readonly router: Router
  ) { }


  ngOnInit() {
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

  logoutUser() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']);
  }
}
