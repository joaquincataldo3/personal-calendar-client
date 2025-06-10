import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, ICreateEventData, IEvent } from '../../interfaces/interfaces';
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
    const {id, title, description, start_time, end_time} = eventData;
    const apiObject = {
      title, 
      description,
      start_time,
      end_time
    }
    return this.http.put<IApiResponse>(`${this.baseUrl}/${id}`, apiObject, {withCredentials: true});
  }

  deleteEvent(eventId: number): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${this.baseUrl}/${eventId}`, {withCredentials: true})
  }

  createEvent(eventData: ICreateEventData): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.baseUrl}`, eventData, {withCredentials: true})
  }
}
