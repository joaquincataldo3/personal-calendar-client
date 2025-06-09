import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IApiResponse } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent],
  standalone: true,
})
export class SignInComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  formSubmitted = false;

  isLoading = false;

  apiError = false;

  apiErrorMessage = '';

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.formSubmitted = true;
    this.apiError = false;
    this.apiErrorMessage = '';
    const { email, password } = this.signInForm.value;

    if (email && password && this.signInForm.valid) {
      this.isLoading = true;
      this.authService.signIn(email, password).pipe(
        finalize(() => {
          this.isLoading = false;
          this.formSubmitted = false;
        })
      ).subscribe({
        next: (res: IApiResponse) => {
           const {statusCode} = res;
           if(statusCode === 200){
             this.router.navigate(['/calendar']);
           }
        },
        error: (err: any) => {
          this.apiError = true;
          this.apiErrorMessage = err.error.message;
        }
      })
    }
  }
}