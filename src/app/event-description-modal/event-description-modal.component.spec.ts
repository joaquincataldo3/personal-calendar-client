import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDescriptionModalComponent } from './event-description-modal.component';

describe('EventDescriptionModalComponent', () => {
  let component: EventDescriptionModalComponent;
  let fixture: ComponentFixture<EventDescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDescriptionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
