import { Component, Input } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-calendar.component.html',
  styleUrl: './week-calendar.component.css'
})
export class WeekCalendarComponent {
    @Input() selectedDay: Date = new Date();
    @Input() events: IEvent[] = [];
    weekDays: Date[] = [];
    hours: string[] = [];

    ngOnChanges() {
      if (this.selectedDay) {
        console.log(this.selectedDay)
        this.generateWeek(this.selectedDay);
      }
    }

    ngOnInit() {
      this.hours = Array.from({ length: 23 }, (_, i) => {
        const hour = i + 1;
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour} ${suffix}`;
      });
    }

    generateWeek(date: Date): void {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

      this.weekDays = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        this.weekDays.push(d);
      }
      console.log(this.weekDays)
    }

}
