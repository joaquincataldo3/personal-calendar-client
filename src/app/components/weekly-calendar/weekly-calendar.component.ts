import { Component, Input } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weekly-calendar.component.html',
  styleUrl: './weekly-calendar.component.css'
})
export class WeeklyCalendarComponent {
  @Input() events: IEvent[] = [];
  monthName = '';
  yearLabel = '';
  currentDate = new Date();
  days: Date[] = [];

  ngOnInit() {
    this.updateHeader();
    this.generateDays();
  }

  updateHeader(): void {
    this.monthName = this.currentDate.toLocaleString('en-US', { month: 'long' });
    this.yearLabel = this.currentDate.getFullYear().toString();
  }

  // generates a list of 6 full weeks starting from the last sunday before
  // this allows the calendar grid to be consistent
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

  
}
