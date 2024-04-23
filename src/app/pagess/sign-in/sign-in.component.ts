import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  signupOj: any = {
    userName: '',
    phone: '',
    password: '',
    cfpassword: '',
  };

  constructor(private Router: Router) {}
  onClick() {
    this.Router.navigateByUrl('sign-up'); // Replace with actual sign-in route path
  }
  onSignup() {
    var passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$/;

    if (
      this.signupOj.userName.trim() !== '' &&
      passwordRegex.test(this.signupOj.password) &&
      /^\d{10}$/.test(this.signupOj.phone) &&
      this.signupOj.cfpassword === this.signupOj.password
    ) {
      this.Router.navigateByUrl('/login');
    } else {
      alert('Yêu cầu nhập đúng thông tin');
    }
  }
}
