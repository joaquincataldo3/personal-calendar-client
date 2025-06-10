import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3050/api/auth';

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.baseUrl}/register`, { email, password }, { withCredentials: true });
  }

  signIn(email: string, password: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.baseUrl}/sign-in`, { email, password }, { withCredentials: true });
  }
  
  checkAuth(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}/check-user-logged`, { withCredentials: true });
  }
  
  logout(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}/logout`, {withCredentials: true})
  }
}
