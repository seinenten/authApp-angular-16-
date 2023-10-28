import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public myForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern(this.vS.emailPattern)    ]],
    password: ['', [ Validators.required, Validators.minLength(6)  ]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private vS: ValidatorsService,
    private router: Router
  ){}

  login(){

    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
        .subscribe({
          next: () =>  this.router.navigateByUrl('/dashboard') ,
          error: (message) => {
            Swal.fire('Error', message, 'error')
          }
        })

  }

}
