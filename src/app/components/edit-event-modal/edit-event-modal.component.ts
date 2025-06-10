import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.css'
})
export class EditEventModalComponent {

  eventToEdit!: IEvent;

 constructor(
    public dialogRef: MatDialogRef<EditEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent
  ) {
    this.eventToEdit = data;
  }
  
  onCancel() {
    this.dialogRef.close();
  }
}
