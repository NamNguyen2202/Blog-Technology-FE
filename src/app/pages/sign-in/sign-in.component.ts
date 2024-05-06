import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,  FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from './sign-in.service';
import { Observable, Subject, map } from 'rxjs';
import { PASSWORD_PATTERN } from './sign-up.data';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
  }

  formSubmit$ = new Subject<boolean | null>();

  validateUserNameFromApiDebounce() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.api.validateUsername(control.value).pipe(
            map((isValid) => {
              if (!isValid) {
                return null;
              }
              return {
                usernameDuplicated: true,
              };
            })
          );      
    };
  }

  formSignin  = new FormGroup({
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
  

  
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      },

    );
  


 

  onSignin(){
    // this.api.validateUsername(this.formSignin.value).subscribe((res:any)=>{
    //   console.log(this.formSignin.value)
    // } ),
    // this.api.validatePassword(this.formSignin.value).subscribe((res:any)=>{
    //   console.log(this.formSignin.value)
    // } )
    
    
  }

  
}
