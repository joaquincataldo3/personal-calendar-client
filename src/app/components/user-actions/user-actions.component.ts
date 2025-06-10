import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventModalComponent } from '../create-event-modal/create-event-modal.component';
import { IApiResponse, IEvent } from '../../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserSettingsComponent } from '../user-settings-modal/user-settings-modal.component';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.css'
})
export class UserActionsComponent {

  @Output() eventCreated = new EventEmitter<IEvent>();

  constructor(
    private dialog: MatDialog, 
    private authService: AuthService,
    private router: Router
  ){}

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

  openUserSettingsModal(){
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      width: '400px'
    })
    dialogRef.afterClosed().subscribe((result: IEvent) => {
      if(result){
        this.eventCreated.emit(result);
      }
    });
  }

  logout(){
    this.authService.logout().subscribe(((response: IApiResponse) => {
      if(response.statusCode === 200) {
        window.location.reload();
        return;
      }
    }))
  }

}
