import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl = 'http://localhost:3050/api/auth';

  constructor(private http: HttpClient) { }

  getSettingsConstants(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}/settings-constants`, {withCredentials: true});
  }

  getUserSettings(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}`, {withCredentials: true});
  }
}
