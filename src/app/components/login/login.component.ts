import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }

  msgError: string = '';

  isLoding: boolean = false;



  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })


  handleForm(): void {

    if (this.loginForm.valid) {

      this.isLoding = true;

      this._AuthService.setLogin(this.loginForm.value).subscribe({

        next: (response) => {



          if (response.message == 'success') {

             this.isLoding = false;

             localStorage.setItem('eToken', response.token);

            // this._AuthService.saveUserData();
            console.log(response);

            this._Router.navigate(['/home']);

          }
        },
        error: (err: HttpErrorResponse) => {

          this.isLoding = false;

          this.msgError = err.error.message

        }
      })
    }

    else {
      this.loginForm.markAllAsTouched();
    }

  }


}
