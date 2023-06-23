import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { RouterModule } from '@angular/router';
import { LineInfoProfileComponent } from './line-info-profile/line-info-profile.component';
import { SharedModule } from '../../../pages/shared/shared.module';

@NgModule({
  declarations: [
    EditInfoComponent,
    ShowInfoComponent,
    UserNavBarComponent,
    LineInfoProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    EditInfoComponent,
    ShowInfoComponent,
    UserNavBarComponent,
    LineInfoProfileComponent,
  ]
})
export class ProfileComponentsModule { }
