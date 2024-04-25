import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiService } from './ApiService';
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
const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
const PHONE_NUMBER_PATTERN = /^0\d{9}$/;

const validateUserNameFormApi = (api: ApiService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return api.validateUsername(control.value).pipe(
      map((isValid: Boolean) => {
        return isValid ? null : { isvalidUserName: true };
      })
    );
  };
};

const validateUserNameFromApiDebounce = (api: ApiService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      // dung de xu li sau 300ms khi ket thuc go mo call api
      switchMap(() =>
        api.validateUsername(control.value).pipe(
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
};

const validateMatchedControlsValue = (
  firstControlName: string,
  secondControlName: string
) => {
  return function (formGroup: FormGroup): ValidationErrors | null {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignupComponent implements OnInit {
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
        validateUserNameFromApiDebounce(this.api),
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
        ]),
      ],
    },
    {
      validate: validateMatchedControlsValue('password', 'confirmPassword'),
    }
  );
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

  submitForm() {
    console.log(this.registerForm.value);
  }
}
