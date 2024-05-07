import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from './sign-up.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import {
  Observable,
  Subject,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import {
  PASSWORD_PATTERN,
  PHONE_NUMBER_PATTERN,
  USERNAME_PATTERN,
} from './sign-up.data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private Router: Router
  ) {}
  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => {
          this.submitForm();
        })
      )
      .subscribe();
  }

  onSignIn() {
    this.Router.navigateByUrl('sign-in');
  }
  hidePassword: boolean = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  hideConfirmPassword: boolean = true;
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  formSubmit$ = new Subject<boolean | null>();

  validateUserNameFromApiDebounce() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.api.validateUsername(control.value).pipe(
        map((isValid) => {
          if (isValid) {
            return null;
          }
          return {
            usernameDuplicated: true,
          };
        })
      );
    };
  }
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const error =
      password && confirmPassword && password !== confirmPassword
        ? { passwordMatchValidator: true }
        : null;
    return error;
  };
  registerForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(USERNAME_PATTERN),
        ],
        [this.validateUserNameFromApiDebounce()]
      ),

      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(PHONE_NUMBER_PATTERN),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        Validators.pattern(PASSWORD_PATTERN),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        Validators.pattern(PASSWORD_PATTERN),
      ]),
    },
    {
      validators: [this.passwordMatchValidator],
    }
  );

  validateUserNameFormApi() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.api.validateUsername(control.value).pipe(
        map((isValid: Boolean) => {
          return isValid ? null : { isvalidUserName: true };
        })
      );
    };
  }
  submitForm() {
    console.log(this.registerForm.value);
  }
  submitForm() {
    console.log(this.registerForm.value);
  }
  validateUserNameFromApiDebounce() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.api.validateUsername(control.value).pipe(
            map((isValid) => {
              if (isValid) {
                return null;
              }
              return {
                usernameDuplicated: true,
              };
            })
          );      
    };
  }

}
