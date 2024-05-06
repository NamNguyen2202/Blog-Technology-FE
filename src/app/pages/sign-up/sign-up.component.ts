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
import { PASSWORD_PATTERN, PHONE_NUMBER_PATTERN } from './sign-up.data';
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

  hidePassword: boolean = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  hideConfirmPassword: boolean = true;
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  onClick() {
    this.Router.navigateByUrl(''); // Replace with actual sign-in route path
  }
  formSubmit$ = new Subject<boolean | null>();

  // Định nghĩa hàm validator

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
          Validators.pattern(/^[a-z0-9]{6,32}$/i),
        ],
        [this.validateUserNameFromApiDebounce()]
      ),

      // validateUserNameFormApi(this.api),
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
        // this.passwordMatchValidator('password', 'confirmPassword'),
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

  // validateMatchedControlsValue = (
  //   firstControlName: string,
  //   secondControlName: string
  // ) => {
  //   return function (formGroup: FormGroup): ValidationErrors | null {
  //     const { value: firstControlValue } = formGroup.get(
  //       firstControlName
  //     ) as AbstractControl;
  //     const { value: secondControlValue } = formGroup.get(
  //       secondControlName
  //     ) as AbstractControl;
  //     return firstControlValue === secondControlValue
  //       ? null
  //       : {
  //           valueNotMatch: {
  //             firstControlValue,
  //             secondControlValue,
  //           },
  //         };
  //   };
  // };

  submitForm() {
    console.log(this.registerForm.value);
  }
}
