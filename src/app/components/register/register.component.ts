import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  apiError: boolean = false;

  apiErrorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.strongPasswordValidator]],
  });

  onSubmit() {
    const { email, password } = this.registerForm.value;
    this.formSubmitted = true;
    this.apiError = false;
    this.apiErrorMessage = '';
    if (email && password && this.registerForm.valid ) {
      this.authService.register(email, password).subscribe({
        next: (res) => {
          console.log('success')
          this.formSubmitted = false;
        },
        error: (err: any) => {
          this.apiError = true;
          const {error} = err;
          this.apiErrorMessage = error.message;
          this.formSubmitted = false;
        }
      });
    }
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  return passwordRegex.test(value) ? null : { strongPassword: true };
}

}

