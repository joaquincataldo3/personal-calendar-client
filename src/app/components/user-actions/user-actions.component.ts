import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventModalComponent } from '../create-event-modal/create-event-modal.component';
import { IEvent } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.css'
})
export class UserActionsComponent {

  @Output() eventCreated = new EventEmitter<IEvent>();

  constructor(private dialog: MatDialog){}

  createEvent(){
    const dialogRef = this.dialog.open(CreateEventModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: IEvent) => {
      if(result){
        this.eventCreated.emit(result);
      }
  });
  }

  logout(){}

}
