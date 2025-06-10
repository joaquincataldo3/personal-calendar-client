import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.css'
})
export class EditEventModalComponent {

  eventToEdit!: IEvent;
  eventForm!: FormGroup;

 constructor(
    public dialogRef: MatDialogRef<EditEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    private fb: FormBuilder
  ) {
    this.eventToEdit = data;
    this.eventForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description],
      start_time: [data.start_time, Validators.required],
      end_time: [data.end_time, Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {

  }

  onEditEvent() {

  }


}
