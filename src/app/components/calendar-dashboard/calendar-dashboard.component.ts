import { Component } from '@angular/core';
import { WeeklyCalendarComponent } from '../weekly-calendar/weekly-calendar.component';

@Component({
  selector: 'app-calendar-dashboard',
  standalone: true,
  imports: [WeeklyCalendarComponent],
  templateUrl: './calendar-dashboard.component.html',
  styleUrl: './calendar-dashboard.component.css'
})
export class CalendarDashboardComponent {

}
