import { Component, Input } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  imports: [],
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css'
})
export class WeeklyCalendarComponent {
  @Input() events: IEvent[] = [];
  monthName = '';
  yearLabel = '';
  currentDate = new Date();

  ngOnInit() {
    this.updateHeader();
  }

  updateHeader(): void {
    this.monthName = this.currentDate.toLocaleString('en-US', { month: 'long' });
    this.yearLabel = this.currentDate.getFullYear().toString();
  }
  
}
