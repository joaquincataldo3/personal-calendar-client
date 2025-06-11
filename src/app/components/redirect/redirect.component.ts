import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  template: ''
})
export class RedirectComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.router.navigate(['/calendar']);
        } else {
          this.router.navigate(['/sign-in']);
        }
      },
      error: () => this.router.navigate(['/sign-in'])
    });
  }
}
