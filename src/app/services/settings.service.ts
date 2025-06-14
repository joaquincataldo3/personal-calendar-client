import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, IUserSetting } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private baseUrl = 'http://localhost:3050/api/setting';

  constructor(private http: HttpClient) { }

  getSettingsConstants(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}/settings-constants`, {withCredentials: true});
  }

  getUserSettings(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}`, {withCredentials: true});
  }

  updateUserSettings(settings: IUserSetting): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${this.baseUrl}`, settings, {withCredentials: true})
  }
}
