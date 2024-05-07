import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,  FormControl, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { ApiService } from './sign-in.service';
import { Observable, Subject, map } from 'rxjs';
import { PASSWORD_PATTERN, USERNAME_PATTERN } from './sign-in.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private Router: Router
  ) {}
  ngOnInit(): void {
  }

  formSubmit$ = new Subject<boolean | null>();

  validateUserNameFromApiDebounce() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.api.validateUsername(control.value).pipe(
            map((isValid) => {
              if (!isValid) {
                return null;
              }
              return {
                usernameDuplicated: true,
              };
            })
          );      
    };
  }

  formSignin  = new FormGroup({
        username: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32),
            Validators.pattern(USERNAME_PATTERN),
          ],      
         ),
  
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      },

    );
  


 

  onSignin(){
    console.log(this.formSignin.value) 
      
  }

  hidePassword: boolean = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  
}
