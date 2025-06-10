import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<UserSettingsComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      language: [''],
      timezone: [''],
      location: [''],
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
    this.dialogRef.close();
  }

  onUpdateSettings(): void {

  }
}