import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  validateUsername(username: string): Observable<boolean> {
    console.log('Trigger API call');
    let existedUsers = [ 'trungvo', 'tieppt', 'chautran','namnam'];
    let isValid = existedUsers.every((x) => x !== username);
    return of(isValid).pipe(delay(1000));
  }

  
  validatePassword(password: string): Observable<boolean> {
    console.log('Trigger API call');
    let existedPasswords = ['12345@', 'nam123@', 'namnam1@'];
    let isValid = existedPasswords.every((x) => x !== password);
    return of(isValid).pipe(delay(1000));
  }
}
