import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';
import { toLocalDate } from '../../utils/datesHelper';
import { EventDescriptionModalComponent } from '../../event-description-modal/event-description-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-week-event-card',
  standalone: true,
  imports: [CommonModule, EventDescriptionModalComponent],
  templateUrl: './week-event-card.component.html',
  styleUrl: './week-event-card.component.css'
})
export class WeekEventCardComponent {

  constructor(private dialog: MatDialog){}

  @Input() event!: IEvent;
  @Output() editClicked = new EventEmitter<IEvent>();

  getLocalTimeString(date: string | Date): string {
    const localDate = toLocalDate(date);
    return localDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onEditClick(): void {
    this.editClicked.emit(this.event);
  }

  onSeeMoreClick(): void {
    this.dialog.open(EventDescriptionModalComponent, {
      width: '200px',
      data: this.event
    })
  }

}
