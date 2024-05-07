import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiService } from './sign-up.service';
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
import { Console } from 'console';
@Component({
  selector: 'app-sign-up',
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
        this.validateUserNameFromApiDebounce(),
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
          this.confirmPasswordValidator,
        ]),
      ],
    }
    // {
    //   validator: this.confirmPasswordValidator,
    //   // validator: this.validateMatchedControlsValue(
    //   //   'password',
    //   //   'confirmPassword'
    //   // ),
    // }
  );
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  //   matchOtherValidator(otherControlName: string){
  //   return (control: AbstractControl): {[key: string]: any} | null {
  //     // Lấy ra control của trường khác
  //     const otherControl = control.root.get(otherControlName);

  //     // Kiểm tra xem giá trị của trường hiện tại có khớp với giá trị của trường khác không
  //     if (otherControl && control.value !== otherControl.value) {
  //       // Trả về một object chứa key 'matchOther' nếu không khớp
  //       return { matchOther: true };
  //     }

  //     // Trường hợp khớp, trả về null
  //     return null;
  //   };
  // }

  // validateMatchedControlsValue(
  //   firstControlName: string,
  //   secondControlName: string
  // ) {
  //   return (formGroup: FormGroup): ValidationErrors | null => {
  //     const firstControl = formGroup.get(firstControlName);
  //     const secondControl = formGroup.get(secondControlName);
  //     console.log(firstControl);
  //     console.log(secondControl);

  //     if (!firstControl || !secondControl) {
  //       // Nếu không tìm thấy, trả về null
  //       return null;
  //     }

  //     const firstControlValue = firstControl.value;
  //     const secondControlValue = secondControl.value;

  //     // Kiểm tra cả hai lỗi khớp mật khẩu và confirmPassword
  //     return {
  //       valueNotMatch: firstControlValue !== secondControlValue,
  //       confirmPasswordErrors: secondControl.errors, // Bao gồm các lỗi tiềm ẩn trong confirmPassword
  //     };
  //   };
  // }

  // validateMatchedControlsValue(
  //   firstControlName: string,
  //   secondControlName: string
  // ) {
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
  // }

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
  // validateUserNameFormApi() {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return this.api.validateUsername(control.value).pipe(
  //       map((isValid: Boolean) => {
  //         return isValid ? null : { isvalidUserName: true };
  //       })
  //     );
  //   };
  // }
}
