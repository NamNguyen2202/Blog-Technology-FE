import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  GetAllPost(): Observable<IPost[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.POST;
    return this.httpClient.get<IPost[]>(url, { headers });
  }

  GetAllPostId(categoryIds: number[]): Observable<IPost[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const ids = categoryIds.join(',');
    const url =
      categoryIds.length === 0
        ? API_ENDPOINTS.POST_ID('')
        : API_ENDPOINTS.POST_ID(ids);
    return this.httpClient.get<IPost[]>(url, { headers });
  }
}
