import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isDarkMode?: boolean;
  btnText: string = 'Start coding now';

  ngOnInit() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.checkDarkMode(darkModeQuery.matches);
    darkModeQuery.addEventListener('change', event => this.checkDarkMode(event.matches));
  }

  checkDarkMode(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
  }

  logoDarkImageUrl: string = '../../../assets/img/devchallenges-light.svg'
  logoLightImageUrl: string = '../../../assets/img/devchallenges.svg'
}
