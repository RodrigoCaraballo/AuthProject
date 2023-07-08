import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ShowInfoComponent } from './show-info/show-info.component';
import { UserNavBarComponent } from './user-nav-bar/user-nav-bar.component';
import { RouterModule } from '@angular/router';
import { LineInfoProfileComponent } from './line-info-profile/line-info-profile.component';
import { SharedModule } from '../../../pages/shared/shared.module';
import { WebNavMenuComponent } from './web-nav-menu/web-nav-menu.component';
import { MobileNavMenuComponent } from './mobile-nav-menu/mobile-nav-menu.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditInfoComponent,
    ShowInfoComponent,
    UserNavBarComponent,
    LineInfoProfileComponent,
    WebNavMenuComponent,
    MobileNavMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditInfoComponent,
    ShowInfoComponent,
    UserNavBarComponent,
    LineInfoProfileComponent,
  ]
})
export class ProfileComponentsModule { }
