import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.strongPasswordValidator]],
  });

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      
    }
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  return passwordRegex.test(value) ? null : { strongPassword: true };
}

}

