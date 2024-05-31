import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../app.backend';
import { AddPost, Post } from './interface/articles.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<any[]>(API_ENDPOINTS.GET_CATEGORIES, {
      headers,
    });
  }

  addPost(post: Post): Observable<AddPost> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<AddPost>(API_ENDPOINTS.ADD_POST, post, {
      headers,
    });
  }

  getUserId(username: string): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<number>(API_ENDPOINTS.GET_USER_ID_BY_USERNAME(username), {
      headers,
    });
  }
}

