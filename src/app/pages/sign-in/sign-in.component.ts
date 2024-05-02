import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { tap, switchMap, startWith, filter, take, Subject, Observable, timer, map } from 'rxjs';
import { ApiService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private fb: FormBuilder, private api: ApiService) {}

  formSubmit$ = new Subject<boolean | null>();
  loginForm = this.fb.group({
    username: [
      '',
      Validators.compose([
        Validators.required,
        
    
      ]),
      this.validateUserNameFromApiDebounce(),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ]),
    ],
  });

  ngOnInit(): void {
    this.formSubmit$
      .pipe(
        tap(() => this.loginForm.markAsDirty()),
        switchMap(() => this.loginForm.statusChanges.pipe(
          startWith(this.loginForm.status),
          filter(status => status !== 'PENDING'),
          take(1)
        )),
        filter(status => status === 'VALID'),
        tap(() => this.submitForm())
      )
      .subscribe();
  }

  submitForm() {
    console.log(this.loginForm.value);
  }
  validateUserNameFromApiDebounce() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        switchMap(() => this.api.validateUsername(control.value).pipe(
          map(isValid => isValid ? null : { usernameNotFound: true })
        ))
      );
    };
  }
  
}
