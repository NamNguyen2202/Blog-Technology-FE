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
import { SignUpResponse, User } from '../../common/interfaces/user.interface';
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
  ngOnInit(): void {}

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
      return this.api
        .SignUpCheck(this.registerForm.get('username')!.value || '')
        .pipe(
          map((isDuplicated: boolean) => {
            if (isDuplicated) {
              return { usernameDuplicated: true };
            } else {
              return null;
            }
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
  onSignUp() {
    if (this.registerForm.valid) {
      const user: User = {
        userName: this.registerForm.get('username')!.value || '',
        phone: this.registerForm.get('phone')!.value || '',
        password: this.registerForm.get('password')!.value || '',
      };

      this.api.SignUp(user).subscribe({
        next: (signUpResult: SignUpResponse) => {
          if (signUpResult.success) {
            console.log('Đăng ký thành công', signUpResult.userName);
            alert('Đăng kí thành công');
            this.Router.navigateByUrl('sign-in');
          } else {
            alert(signUpResult.message || 'Vui lòng thử lại.');
            console.log('Không đăng ký được', signUpResult.message);
          }
        },
        error: (error) => {
          alert(
            'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.'
          );
          console.error('Có lỗi xảy ra:', error);
        },
        complete: () => {
          console.log('Đăng ký hoàn tất');
        },
      });
    } else {
      console.log('Vui lòng nhập đầy đủ thông tin.');
    }
  }

  submitForm() {
    console.log(this.registerForm.value);
  }
}
