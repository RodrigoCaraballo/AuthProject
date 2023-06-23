import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  componentOnLoad: boolean = true;

  reciveComponentOn($event: boolean): void {
    this.componentOnLoad = $event
  }
}
