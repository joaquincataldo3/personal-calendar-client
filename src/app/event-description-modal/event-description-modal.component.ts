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

  constructor(
      public dialogRef: MatDialogRef<EventDescriptionModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IEvent,
  ){
    this.event = {
      ...data,
      start_time: toLocalDate(data.start_time),
      end_time: toLocalDate(data.end_time)
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
