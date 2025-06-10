import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IApiResponse, IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { localDatetimeToUTCString, toDatetimeLocalString } from '../../utils/utils';
import { EventsService } from '../../services/events.service';
import { finalize } from 'rxjs/operators';

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
  isLoading: boolean = false;
  formSubmitted: boolean = false;
  apiError: boolean = false;
  apiErrorMessage: string = '';

 constructor(
    public dialogRef: MatDialogRef<EditEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    private fb: FormBuilder,
    private eventsService: EventsService,
  ) {
    this.eventToEdit = data;
    this.eventForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description],
      start_time: [toDatetimeLocalString(data.start_time), Validators.required],
      end_time: [toDatetimeLocalString(data.end_time), Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {

  }

  onEditEvent() {
    if (this.eventForm.invalid) return;
    this.formSubmitted = true;
    const formValue = this.eventForm.value;
    const updatedEvent = {
      ...this.data, 
      title: formValue.title,
      description: formValue.description,
      startTime: localDatetimeToUTCString(formValue.start_time),
      endTime: localDatetimeToUTCString(formValue.end_time)
    };
    this.eventsService.editEvent(updatedEvent).pipe(
      finalize(() => {
        this.isLoading = false;
        this.formSubmitted = false;
      })
    ).subscribe({
      next: (res: IApiResponse) => {
          console.log(res)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }


}
