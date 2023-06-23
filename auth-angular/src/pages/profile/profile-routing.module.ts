import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', title: 'Auth - Profile', component: ProfilePageComponent},
      {path: '**', redirectTo: ''}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule { }
