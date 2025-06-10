import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, IEvent } from '../../interfaces/interfaces';
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

  editEvent(eventData: any): Observable<IApiResponse> {
    console.log(eventData)
    const {id, title, description, startTime, endTime} = eventData;
    const apiObject = {
      title, 
      description,
      startTime,
      endTime
    }
    return this.http.put<IApiResponse>(`${this.baseUrl}/${id}`, apiObject, {withCredentials: true});
  }
}
