import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponentsModule } from './components/profile-components.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ServicesModule } from '../../services';

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    ProfileComponentsModule,
    ProfileRoutingModule,
    ServicesModule
  ]
})
export class ProfileModule { }
