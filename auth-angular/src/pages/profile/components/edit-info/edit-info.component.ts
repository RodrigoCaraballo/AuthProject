import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent {

  @Output() componentOnEvent = new EventEmitter<boolean>();
  profileImgUrl: string = '../../../../assets/img/profile-img.png'

  sendComponentOn(): void {
    this.componentOnEvent.emit(true);
  }
}
