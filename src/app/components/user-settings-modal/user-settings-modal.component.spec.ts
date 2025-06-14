import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsModalComponent } from './user-settings-modal.component';

describe('UserSettingsModalComponent', () => {
  let component: UserSettingsModalComponent;
  let fixture: ComponentFixture<UserSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
