import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
} from "@angular/forms";
import { SignInService } from "./sign-in.service";
import { Observable, Subject, map } from "rxjs";
import { PASSWORD_PATTERN, USERNAME_PATTERN } from "./sign-in.data";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: SignInService,
    private Router: Router,
    httpclient: HttpClient
  ) {}
  ngOnInit(): void {}

  formSubmit$ = new Subject<boolean | null>();

  onSignIn() {
    const credentials = {
      userName: this.formSignin.get("userName")!.value || "",
      password: this.formSignin.get("password")!.value || "",
    };

    // Kiểm tra thông tin đăng nhập với cơ sở dữ liệu
    this.api.SignIn(credentials).subscribe({
      next: (signInResult: boolean) => {
        if (signInResult) {
          console.log("Đăng nhập thành công");
          this.Router.navigateByUrl("/");
        } else {
          console.log("Thông tin đăng nhập không đúng");
          alert("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.");
        }
      },
      error: (error) => {
        console.error("Có lỗi xảy ra:", error);
        alert("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.");
      },
      complete: () => {
        console.log("Đăng nhập hoàn tất");
      },
    });
  }

  formSignin = new FormGroup({
    userName: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
      Validators.pattern(USERNAME_PATTERN),
    ]),

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
      Validators.pattern(PASSWORD_PATTERN),
    ]),
  });

  onSignUp() {
    this.Router.navigateByUrl("sign-up");
  }
  hidePassword: boolean = true;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
