import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AuthFormComponent } from './auth-form/auth-form.component';



@NgModule({
  declarations: [
    AuthFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AuthFormComponent]
})
export class AuthComponentsModule { }
