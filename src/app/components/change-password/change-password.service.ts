import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../app.backend';

@Injectable({
  providedIn: 'root',
})
export class ChangePassService {
  constructor(private httpClient: HttpClient) {}
  ChangePass(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.CATEGORY_POST;
    return this.httpClient.get<any[]>(url, { headers });
  }
}
