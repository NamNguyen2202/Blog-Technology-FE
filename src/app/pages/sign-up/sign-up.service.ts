import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { SignUpResponse, User } from '../../common/interfaces/user.interface';
import { API_ENDPOINTS } from '../../app.backend';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  SignUpCheck(userName: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.CHECK_SIGN_UP(userName);
    return this.httpClient.get<boolean>(url, { headers });
  }

  SignUp(user: User): Observable<SignUpResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.SIGN_UP;
    return this.httpClient.post<SignUpResponse>(url, user, {
      headers,
    });
  }
}
