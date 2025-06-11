import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { IApiResponse, IUserSetting } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings-modal.component.html',
  styleUrl: './user-settings-modal.component.css',
  standalone: true,
  imports: [LoadingSpinnerComponent, CommonModule, ReactiveFormsModule]
})
export class UserSettingsComponent implements OnInit {
  form!: FormGroup;
  languages: { value: string, label: string }[] = [];
  timezones: { value: string, label: string }[] = [];
  locations: { value: string, label: string }[] = [];
  isLoading = false;
  formSubmitted: boolean = false;
  apiError = false;
  apiErrorMessage = '';
  darkMode: boolean = false;


  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserSetting
  ) {

    this.darkMode = data.dark_mode;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      language: ['', Validators.required],
      timezone: ['', Validators.required],
      location: ['', Validators.required],
      dark_mode: [false]
    });

    this.loadConstants();
    this.loadUserSettings();
  }

  loadConstants(): void {
    this.settingsService.getSettingsConstants().subscribe((response) => {
      [this.languages, this.timezones, this.locations] = response.data;
    });
  }

  loadUserSettings(): void {
    this.settingsService.getUserSettings().subscribe((response) => {
      this.form.patchValue(response.data);
    });
  }

  onCancel(): void {
    this.dialogRef.close({
        updated: false,
        data: null
    });
  }

  onUpdateSettings(): void {
    this.formSubmitted = true;
    if(this.form.invalid) return;
    this.isLoading = true;
    const formValue = this.form.value;
    this.settingsService.updateUserSettings(formValue).pipe(
      finalize(() => {
        this.formSubmitted = false;
        this.isLoading = false;
      })
    ).subscribe({
      next: (res: IApiResponse) => {
        this.dialogRef.close({
          updated: true,
          data: formValue
        });
      },
      error: (err: any) => {
        this.apiError = true;
        this.apiErrorMessage = err.error.message;
      }
    })
  }
}