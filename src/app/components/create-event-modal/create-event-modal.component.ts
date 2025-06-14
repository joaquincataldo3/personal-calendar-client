import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import {
  sameDayValidator,
  startBeforeEndValidator,
  localDatetimeToUTCString,
  toDatetimeLocalString
} from '../../utils/datesHelper';
import { IUserSetting } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-create-event-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.css'
})
export class CreateEventModalComponent {

  eventForm!: FormGroup;
  isLoading = false;
  formSubmitted = false;
  apiError = false;
  apiErrorMessage = '';
  darkMode: boolean;


  constructor(
    public dialogRef: MatDialogRef<CreateEventModalComponent>,
    private fb: FormBuilder,
    private eventsService: EventsService,
    @Inject(MAT_DIALOG_DATA) public data: IUserSetting
  ) {
    this.darkMode = data.dark_mode ?? false;

    const now = new Date();
    const localNow = toDatetimeLocalString(now);
    const localEnd = toDatetimeLocalString(new Date(now.getTime() + 30 * 60000));

    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start_time: [localNow, Validators.required],
      end_time: [localEnd, Validators.required],
    }, {
      validators: [startBeforeEndValidator, sameDayValidator]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateEvent(): void {
    this.formSubmitted = true;
    if (this.eventForm.invalid) return;

    this.isLoading = true;
    const formValue = this.eventForm.value;
    const newEvent = {
      title: formValue.title,
      description: formValue.description,
      start_time: localDatetimeToUTCString(formValue.start_time),
      end_time: localDatetimeToUTCString(formValue.end_time)
    };

    this.eventsService.createEvent(newEvent).pipe(
      finalize(() => {
        this.isLoading = false;
        this.formSubmitted = false;
      })
    ).subscribe({
      next: (res) => {
        if(res.statusCode === 200){
          const {data} = res;
          this.dialogRef.close(data);
        }
      },
      error: (err) => {
        this.apiError = true;
        this.apiErrorMessage = err.error.message;
      }
    });
  }
}