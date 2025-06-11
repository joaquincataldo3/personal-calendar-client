import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEvent } from '../../interfaces/interfaces';
import { toLocalDate } from '../utils/datesHelper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-description-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-description-modal.component.html',
  styleUrl: './event-description-modal.component.css'
})
export class EventDescriptionModalComponent {

  event!: IEvent;
  darkMode: boolean = false;

  constructor(
      public dialogRef: MatDialogRef<EventDescriptionModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    const event = data.event;
    this.event = {
      ...event,
      start_time: toLocalDate(event.start_time),
      end_time: toLocalDate(event.end_time)
    }
    this.darkMode = data.darkMode;
  }

  onCancel(){
    this.dialogRef.close();
  }

}
