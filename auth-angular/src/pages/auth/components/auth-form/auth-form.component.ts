import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {

  @Input() btnText?: string;
  googleLogoUrl: string = '../../../assets/img/Google.svg'
  facebookLogoUrl: string = '../../../assets/img/Facebook.svg'

  constructor(
    private readonly fb: FormBuilder
  ) { }

  authForm = this.fb.group({
    email: this.fb.nonNullable.control('',
      {
        validators: [Validators.required, Validators.email,
        Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+")]
      }),
    password: this.fb.nonNullable.control('',
      { validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$'),] })
  })

  formData() {
    const algo = this.authForm.getRawValue()

    if (this.btnText === 'Login') {
      console.log(`Logeando: ${algo.email}`);
      return;
    }
    console.log(`Registrando: ${algo.email}`);
  }
}
