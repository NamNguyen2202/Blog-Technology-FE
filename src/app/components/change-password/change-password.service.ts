import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../app.backend';
import {
  IChangePass,
  IChangePassword,
} from '../../common/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ChangePassService {
  constructor(private httpClient: HttpClient) {}
  ChangePass(changePass: IChangePass): Observable<IChangePassword> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.CHANGE_PASS;
    return this.httpClient.put<IChangePassword>(
      url,
      { changePass },
      { headers }
    );
  }
}
