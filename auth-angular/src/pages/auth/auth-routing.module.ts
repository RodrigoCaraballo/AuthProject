import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'login', title: 'Auth - Login', component: LoginComponent},
      {path: 'register', title: 'Auth - Register', component: RegisterComponent},
      {path: '**', redirectTo: 'login'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
