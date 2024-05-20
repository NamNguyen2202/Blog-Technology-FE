import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { API_ENDPOINTS } from "../../app.backend";
import { SignInUser, SignInResponse } from "./interface/sign-in.interface";

@Injectable({
  providedIn: "root",
})
export class SignInService {
  constructor(private httpClient: HttpClient) {}
  SignInCheck(userName: string): Observable<boolean> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    const url = API_ENDPOINTS.CHECK_SIGN_IN(userName);
    return this.httpClient.post<boolean>(url, { userName }, { headers });
  }

  SignIn(user: SignInUser): Observable<SignInResponse> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.httpClient.post<SignInResponse>(API_ENDPOINTS.SIGN_IN, user, {
      headers,
    });
  }
}
