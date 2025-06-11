import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IEditOrDeleteModalResult, IEvent, IUserSetting, PositionedEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { WeekEventCardComponent } from '../week-event-card/week-event-card.component';
import { toLocalDate } from '../../utils/datesHelper';
import { MatDialog } from '@angular/material/dialog';
import { EditEventModalComponent } from '../edit-event-modal/edit-event-modal.component';

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
    isEditModalOpen: boolean = false;
    selectedEvent: IEvent | null = null;
    @Output() eventUpdated = new EventEmitter<IEditOrDeleteModalResult>();
    @Input() settings: IUserSetting | null = null;
    darkMode: boolean = false;

    constructor(private dialog: MatDialog){}

    ngOnChanges(changes: SimpleChanges) {
      if (this.selectedDay) {
        this.generateWeek(this.selectedDay);
      }
      if (changes['settings'] && this.settings) {
        this.darkMode = this.settings.dark_mode;
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

    // returns the events for the passed date
    // if there is overlapping of two events, one is assigned as right and the other one as left
    // it assumes just 2 overlapped events (for simplicity)
    getPositionedEventsForDay(day: Date): PositionedEvent[] {
      const dayEvents = this.events.filter(ev => {
        const evDate = toLocalDate(ev.start_time);
        return (
          evDate.getDate() === day.getDate() &&
          evDate.getMonth() === day.getMonth() &&
          evDate.getFullYear() === day.getFullYear()
        );
      });

      const positionedEvents: PositionedEvent[] = [];

      for (let i = 0; i < dayEvents.length; i++) {
        const ev1 = dayEvents[i];
        const ev1Start = new Date(ev1.start_time).getTime();
        const ev1End = new Date(ev1.end_time).getTime();

        let isOverlapped = false;

        for (let j = 0; j < dayEvents.length; j++) {
          if (i === j) continue;

          const ev2 = dayEvents[j];
          const ev2Start = new Date(ev2.start_time).getTime();
          const ev2End = new Date(ev2.end_time).getTime();

          if (ev1Start < ev2End && ev1End > ev2Start) {
            isOverlapped = true;
            positionedEvents.push({ ...ev1, overlap: true, position: 'left' });
            positionedEvents.push({ ...ev2, overlap: true, position: 'right' });
            break;
          }
        }

        if (!isOverlapped) {
          positionedEvents.push({ ...ev1, overlap: false, position: 'left' });
        }
      }

      // avoid duplicates
      return positionedEvents.filter(
        (ev, index, self) => index === self.findIndex(e => e.id === ev.id)
      );
    }

    // calculates de vertifcal offset from the top
    // based on a visible range from 1 am to 11 pm
    // events from 12 am to 1 am will be placed in 1 am slot
    getEventTopOffset(event: IEvent): number {
      const start = toLocalDate(event.start_time);
      const minutesFrom1AM = Math.max(0, (start.getHours() * 60 + start.getMinutes()) - 60); 
      const maxVisibleMinutes = 22 * 60;

      return (minutesFrom1AM / maxVisibleMinutes) * 100;
    }

    getEventHeight(event: IEvent): number {
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
      const minPercent = (50 / containerHeightPx) * 100;

      return Math.max(percent, minPercent);
    }

    isSelectedDay(date1: Date, date2: Date): boolean {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }

    openEditModal(event: IEvent): void {
        const dialogRef = this.dialog.open(EditEventModalComponent, {
          data: {
            event,
            darkMode: this.darkMode
          },
          width: '400px', 
        });

        dialogRef.afterClosed().subscribe((result: IEditOrDeleteModalResult) => {
          if (result) {
            this.eventUpdated.emit(result);
          }
        });
    }


}
