import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
  standalone: true,
  imports: []
})
export class UserSettingsComponent implements OnInit {
  form!: FormGroup;

  languages: { value: string, label: string }[] = [];
  timezones: { value: string, label: string }[] = [];
  locations: { value: string, label: string }[] = [];

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

  cancel(): void {
    this.dialogRef.close();
  }
}