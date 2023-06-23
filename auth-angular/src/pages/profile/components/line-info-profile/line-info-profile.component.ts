import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-info-profile',
  templateUrl: './line-info-profile.component.html',
  styleUrls: ['./line-info-profile.component.css']
})
export class LineInfoProfileComponent {

  @Input() lineTitle?: string;
  @Input() lineValue?: string;
  @Input() borderBottom: boolean = true;
}
