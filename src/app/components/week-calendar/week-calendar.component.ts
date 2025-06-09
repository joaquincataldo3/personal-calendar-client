import { Component, Input } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { WeekEventCardComponent } from '../week-event-card/week-event-card.component';
import { toLocalDate } from '../../utils/utils';

@Component({
  selector: 'app-week-calendar',
  standalone: true,
  imports: [CommonModule, WeekEventCardComponent],
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
        this.generateWeek(this.selectedDay);
      }
    }

    ngOnInit() {
      // starting the hours array from 23 positions (for the 23 visible hours in calendar)
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
    }

    getEventsForDay(day: Date): IEvent[] {
      return this.events.filter(ev => {
        const evDate = toLocalDate(ev.start_time);
        console.log(ev.title)
        console.log(evDate)
        return (
          evDate.getDate() === day.getDate() &&
          evDate.getMonth() === day.getMonth() &&
          evDate.getFullYear() === day.getFullYear()
        );
      });
    }

    // calculates de vertifcal offset from the top
    // based on a visible range from 1 am to 11 pm
    getEventTopOffset(event: IEvent): number {
      const start = toLocalDate(event.start_time);
      const minutesFrom1AM = (start.getHours() * 60 + start.getMinutes()) - 60; 
      const maxVisibleMinutes = 22 * 60; 

      return (minutesFrom1AM / maxVisibleMinutes) * 100;
    }

    getEventHeight(event: IEvent): number {
      console.log(event)
      const start = toLocalDate(event.start_time);
      const end = toLocalDate(event.end_time);

      const startMinutes = Math.max(60, start.getHours() * 60 + start.getMinutes()); 
      const endMinutes = Math.min(1410, end.getHours() * 60 + end.getMinutes());    

      const durationInMinutes = endMinutes - startMinutes;

      // max visualizable: 1 AM to 11 PM = 1320 minutes
      const maxVisibleMinutes = 22 * 60;

      // avoid negative durations
      const clampedDuration = Math.max(0, durationInMinutes);

      const percent = (clampedDuration / maxVisibleMinutes) * 100;

      // 45px as the minimum height, converted to percentage of a 1320px tall container
      const containerHeightPx = 60 * 22; 
      const minPercent = (45 / containerHeightPx) * 100;

      return Math.max(percent, minPercent);
    }

}
