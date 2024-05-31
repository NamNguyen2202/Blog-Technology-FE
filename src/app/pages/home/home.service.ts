import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../app.backend';
import { ICategory, IComment, IPost, IUser } from './interfaces/home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  GetCategory(): Observable<ICategory[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.GET_CATEGORIES;
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

  getUserId(username: string): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<number>(
      API_ENDPOINTS.GET_USER_ID_BY_USERNAME(username),
      {
        headers,
      }
    );
  }

  getUserName(userid: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<string>(
      API_ENDPOINTS.GET_USER_NAME_BY_USERID(userid),
      {
        headers,
      }
    );
  }

  getCommentsByPostId(postId: number): Observable<IComment[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.GET_COMMENTS_BY_POST_ID(postId);
    return this.httpClient.get<IComment[]>(url, { headers });
  }

  addComment(
    comment: IComment
  ): Observable<{ success: boolean; message?: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.ADD_COMMENT;
    return this.httpClient.post<{ success: boolean; message?: string }>(
      url,
      comment,
      { headers }
    );
  }

  getAllPostsForUser(userId: number): Observable<IPost[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = API_ENDPOINTS.GET_ALLPOST_BY_USERID(userId); // Giả sử API_ENDPOINTS.POST/user/:userId là endpoint để lấy bài post của một người dùng
    return this.httpClient.get<IPost[]>(url, { headers });
  }
  
}
