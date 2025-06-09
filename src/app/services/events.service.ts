import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = 'http://localhost:3050/api/event';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}`, {withCredentials: true});
  }
}
