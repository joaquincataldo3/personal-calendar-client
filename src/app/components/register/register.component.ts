import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IApiResponse } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  apiError: boolean = false;

  apiErrorMessage: string | null = null;

  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.authService.register(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.formSubmitted = false;
        })
      )
      .subscribe({
        next: (res: IApiResponse) => {
          const {statusCode} = res;
          if(statusCode === 201){
            this.router.navigate(['/sign-in']);
          }
        },
        error: (err: any) => {
          this.apiError = true;
          this.apiErrorMessage = err.error.message;
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

