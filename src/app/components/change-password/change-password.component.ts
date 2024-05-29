import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  PHONE_NUMBER_PATTERN,
  PASSWORD_PATTERN,
} from '../../pages/sign-in/sign-in.data';
import { Router } from 'express';
import { ChangePassService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private router: Router, private changepass: ChangePassService) {}
  hidePassword: boolean = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  hideConfirmPassword: boolean = true;
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  registerForm = new FormGroup(
    {
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(PHONE_NUMBER_PATTERN),
      ]),

      curruntPasswork: new FormControl('', [
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
    }
    // {
    //   validators: [this.passwordMatchValidator],
    // }
  );
}
