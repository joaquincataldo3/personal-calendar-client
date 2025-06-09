import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekEventCardComponent } from './week-event-card.component';

describe('WeekEventCardComponent', () => {
  let component: WeekEventCardComponent;
  let fixture: ComponentFixture<WeekEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekEventCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
