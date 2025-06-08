import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
 @Input() isSpinnerActive = false;

  @Input() spinnerWidth = 40;

  @Input() spinnerHeight = 40;

  @Input() border = 5;

  @Input() borderTopColor = '#e60466';
}
