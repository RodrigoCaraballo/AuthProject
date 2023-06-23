import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent {

  @Output() componentOnEvent = new EventEmitter<boolean>();
  profileImgUrl: string = '../../../../assets/img/profile-img.png'

  sendComponentOn(): void {
    this.componentOnEvent.emit(false);
  }
}
