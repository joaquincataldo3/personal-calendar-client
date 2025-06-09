import { Component, OnInit } from '@angular/core';
import { WeeklyCalendarComponent } from '../weekly-calendar/weekly-calendar.component';
import { MonthlyCalendarComponent } from '../monthly-calendar/monthly-calendar.component';
import { EventsService } from '../../services/events.service';
import { IApiResponse, IEvent } from '../../../interfaces/interfaces';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-dashboard',
  standalone: true,
  imports: [CommonModule, WeeklyCalendarComponent, MonthlyCalendarComponent, LoadingSpinnerComponent],
  templateUrl: './calendar-dashboard.component.html',
  styleUrl: './calendar-dashboard.component.css'
})
export class CalendarDashboardComponent implements OnInit {

  events: IEvent[] = [];

  spinnerWidth = 80;

  spinnerHeight = 80;

  spinnerBorder = 8;

  isFetchingEvents: boolean = false;

  constructor(private eventsService: EventsService){}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe((response: IApiResponse) => {
      this.events = response.data;
    });
  }
  
}
