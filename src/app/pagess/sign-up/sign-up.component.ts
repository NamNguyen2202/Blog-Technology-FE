import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignupComponent {
  signupOj: any = {
    userName: '',
    phone: '',
    password: '',
    cfpassword: '',
  };

  constructor(private router: Router) {}
  onSignup() {
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$/;

    if (
      this.signupOj.userName.trim() !== '' &&
      passwordRegex.test(this.signupOj.password) &&
      /^\d{10}$/.test(this.signupOj.phone) &&
      this.signupOj.cfpassword === this.signupOj.password
    ) {
      this.router.navigateByUrl('/login');
    } else {
      alert('Yêu cầu nhập đúng thông tin');
    }
  }
}
