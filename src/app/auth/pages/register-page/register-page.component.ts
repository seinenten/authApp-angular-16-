import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/services/email-validator.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    //? arreglar el servicio e implementarselo. email: [ '', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ] , [ this.emailValidatorService ] ],
    email: [ '', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ] ,  ],
    password: [ '' ,[Validators.required, Validators.minLength(6) ]  ],
    password2: [ '' ,[Validators.required  ]  ],
    name: [ '', [Validators.required, Validators.minLength(3) ]  ]
  }, {
    validators: [
      this.validatorService.contraseñaSonIguales('password', 'password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidatorService: EmailValidatorService,
    private authService:AuthService,
    private router: Router
  ){}

  register(){

    const { name, email, password } = this.myForm.value;

    console.log({ name, email, password })

    this.authService.register(email,name,password)
            .subscribe({
              next: () => this.router.navigateByUrl('/dashboard'),
              error: (message) => {
                Swal.fire('Error', message, 'error')
              }
            })
  }

}
