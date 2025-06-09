import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IEvent } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-week-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-event-card.component.html',
  styleUrl: './week-event-card.component.css'
})
export class WeekEventCardComponent {

  @Input() event: IEvent | null = null;


}
