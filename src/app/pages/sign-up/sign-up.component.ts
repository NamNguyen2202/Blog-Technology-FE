import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
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
@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService) {}
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
  formSubmit$ = new Subject<boolean | null>();
  registerForm = this.fb.group(
    {
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
        // validateUserNameFormApi(this.api),
        this.validateUserNameFromApiDebounce,
      ],
      phone: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(PHONE_NUMBER_PATTERN),
        ]),
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(PASSWORD_PATTERN),
          this.passwordMatchValidator,
        ]),
      ],
    }
    // {
    //   validate: validateMatchedControlsValue('password', 'confirmPassword'),
    // }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }
  validateUserNameFormApi() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.api.validateUsername(control.value).pipe(
        map((isValid: Boolean) => {
          return isValid ? null : { isvalidUserName: true };
        })
      );
    };
  }

  validateUserNameFromApiDebounce() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        // dung de xu li sau 300ms khi ket thuc go mo call api
        switchMap(() =>
          this.api.validateUsername(control.value).pipe(
            map((isValid) => {
              if (isValid) {
                return null;
              }
              return {
                usernameDuplicated: true,
              };
            })
          )
        )
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
