import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { PASSWORD_PATTERN } from '../../pages/sign-in/sign-in.data';
import { ChangePassService } from './change-password.service';
import { HomeService } from '../../pages/home/home.service';
import { HomeComponent } from '../../pages/home/home.component';
import {
  IChangePass,
  IChangePassword,
} from '../../common/interfaces/user.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private changePassService: ChangePassService,
    private homeComponent: HomeComponent
  ) {}
  ngOnInit(): void {}
  getUserName(): string {
    return this.homeComponent.getUserName();
  }
  hidePassword: boolean = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  hideConfirmPassword: boolean = true;
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
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
      currentpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        Validators.pattern(PASSWORD_PATTERN),
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

  onChange() {
    const changePass: IChangePass = {
      userName: this.getUserName(),
      currentPassword: this.registerForm.get('currentpassword')!.value || '',
      newPassword: this.registerForm.get('password')!.value || '',
    };
    this.changePassService.ChangePass(changePass).subscribe({
      next: (result: IChangePassword) => {
        if (result.success) {
          alert('Thay đổi thành công');
        } else {
          alert(result.message || 'Hãy thử lại.');
        }
      },
      error: (error) => {
        alert('Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.');
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Hoàn thành thay đổi mk');
      },
    });
  }
}
