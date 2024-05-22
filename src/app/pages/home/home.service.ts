import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../app.backend';
import { ICategory, IPost } from './interfaces/home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  GetCategory(): Observable<ICategory[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.CATEGORY_POST;
    return this.httpClient.get<ICategory[]>(url, { headers });
  }

  GetPost(): Observable<IPost[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.POST;
    return this.httpClient.get<IPost[]>(url, { headers });
  }

  GetAllPostId(category: number): Observable<IPost[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.POST_ID(category);
    return this.httpClient.get<IPost[]>(url, { headers });
  }
}
