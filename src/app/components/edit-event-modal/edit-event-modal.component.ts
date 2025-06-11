import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IApiResponse, IEvent } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { localDatetimeToUTCString, sameDayValidator, startBeforeEndValidator, toDatetimeLocalString } from '../../utils/datesHelper';
import { EventsService } from '../../services/events.service';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-edit-event-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, LoadingSpinnerComponent],
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
  darkMode: boolean;

 constructor(
    public dialogRef: MatDialogRef<EditEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private eventsService: EventsService,
  ) {
    this.eventToEdit = data.event;
    this.darkMode = data.darkMode;
    this.eventForm = this.fb.group({
      title: [this.eventToEdit.title, Validators.required],
      description: [this.eventToEdit.description],
      start_time: [toDatetimeLocalString(this.eventToEdit.start_time), Validators.required],
      end_time: [toDatetimeLocalString(this.eventToEdit.end_time), Validators.required],
    }, {
      validators: [startBeforeEndValidator, sameDayValidator]
    });
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  onEditEvent() {
    this.formSubmitted = true;
    if (this.eventForm.invalid) return;
    this.isLoading = true;
    const formValue = this.eventForm.value;
    const updatedEvent = {
      ...this.eventToEdit,
      description: formValue.description,
      start_time: localDatetimeToUTCString(formValue.start_time),
      end_time: localDatetimeToUTCString(formValue.end_time)
    };
    this.eventsService.editEvent(updatedEvent).pipe(
      finalize(() => {
        this.isLoading = false;
        this.formSubmitted = false;
      })
    ).subscribe({
      next: (res) => {
        this.dialogRef.close({
          event: updatedEvent,
          action: 'EDIT'
        });
      },
      error: (err: any) => {
        this.apiError = true;
        this.apiErrorMessage = err.error.message;
      }
    })
  }

  onDeleteEvent() {
    this.isLoading = false;
    this.eventsService.deleteEvent(this.eventToEdit.id).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: () => {
          this.dialogRef.close({
            event: this.eventToEdit,
            action: 'DELETE'
          });
      },
      error: (err: any) => {
        this.apiError = true;
        this.apiErrorMessage = err.error.message;
      }
    })
  }

}
