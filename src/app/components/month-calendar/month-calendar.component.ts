import { Component, Input } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-month-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-calendar.component.html',
  styleUrl: './month-calendar.component.css'
})
export class MonthCalendarComponent {
  @Input() events: IEvent[] = [];
  monthName = '';
  yearLabel = '';
  currentDate = new Date();
  days: Date[] = [];
  selectedDay: Date = new Date();

  ngOnInit() {
    this.updateHeader();
    this.generateDays();
  }

  updateHeader(): void {
    this.monthName = this.currentDate.toLocaleString('en-US', { month: 'long' });
    this.yearLabel = this.currentDate.getFullYear().toString();
  }

  // generates a list of 6 full weeks starting from the last sunday before
  // this allows the wcalendar grid to be consistent
  generateDays(): void {
    this.days = [];

    const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const startDayOfWeek = startOfMonth.getDay();

    const firstVisibleDay = new Date(startOfMonth);
    firstVisibleDay.setDate(firstVisibleDay.getDate() - startDayOfWeek);

    for (let i = 0; i < 42; i++) {
      this.days.push(new Date(firstVisibleDay));
      firstVisibleDay.setDate(firstVisibleDay.getDate() + 1);
    }
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.updateHeader();
    this.generateDays();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.updateHeader();
    this.generateDays();
  }

  
  getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  // checks if a day has event to render blue dot
  hasEvents(day: Date): boolean {
  const result = this.events.some(ev => {
    const eventDate = new Date(ev.start_time);

    const match =
      eventDate.getDate() === day.getDate() &&
      eventDate.getMonth() === day.getMonth() &&
      eventDate.getFullYear() === day.getFullYear();
  
    return match;
  });
    return result;
  }

  selectDay(day: Date) {
    this.selectedDay = day;
  }

  
}
