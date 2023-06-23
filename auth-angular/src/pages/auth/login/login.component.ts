import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isDarkMode?: boolean;
  btnText: string = 'Login';
  logoDarkImageUrl: string = '../../../assets/img/devchallenges-light.svg'
  logoLightImageUrl: string = '../../../assets/img/devchallenges.svg'

  ngOnInit() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.checkDarkMode(darkModeQuery.matches);
    darkModeQuery.addEventListener('change', event => this.checkDarkMode(event.matches));
  }

  checkDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }
}
