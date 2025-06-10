import { Component, OnInit } from '@angular/core';
import { MonthCalendarComponent } from '../month-calendar/month-calendar.component';
import { WeekCalendarComponent } from '../week-calendar/week-calendar.component';
import { EventsService } from '../../services/events.service';
import { IApiResponse, IEditOrDeleteModalResult, IEvent } from '../../../interfaces/interfaces';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { UserActionsComponent } from '../user-actions/user-actions.component';
import { toLocalDate } from '../../utils/datesHelper';
import { UpcomingEventsWeatherComponent } from '../upcoming-events-weather/upcoming-events-weather.component';

@Component({
  selector: 'app-calendar-dashboard',
  standalone: true,
  imports: [CommonModule, MonthCalendarComponent, WeekCalendarComponent, LoadingSpinnerComponent, UserActionsComponent, UpcomingEventsWeatherComponent],
  templateUrl: './calendar-dashboard.component.html',
  styleUrl: './calendar-dashboard.component.css'
})
export class CalendarDashboardComponent implements OnInit {

  events: IEvent[] = [];

  spinnerWidth = 80;

  spinnerHeight = 80;

  spinnerBorder = 8;

  isFetchingEvents: boolean = false;

  selectedDay: Date = new Date();

  constructor(private eventsService: EventsService){}

  ngOnInit(): void {
    this.isFetchingEvents = true;
    this.getEvents();
    this.isFetchingEvents = false;
  }

  onDaySelected(day: Date) {
    this.selectedDay = day;
  }

  onEventCreated(event: IEvent): void {
    const localStart = toLocalDate(event.start_time);

    this.events = [...this.events, event].sort((a, b) =>
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
    this.selectedDay = localStart;
  }

  getEvents(): void {
    this.eventsService.getEvents().subscribe((response: IApiResponse) => {
      this.events = response.data;
    });
  }
  
  onEventUpdated(updateResult: IEditOrDeleteModalResult): void {
    const { event, action } = updateResult;
    if (action === 'EDIT') {
      const index = this.events.findIndex(e => e.id === event.id);
      if (index !== -1) {
        this.events[index] = event;
      }
    } else if (action === 'DELETE') {
      this.events = this.events.filter(ev => ev.id !== event.id);
    }
  }
  
}
