import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventsWeatherComponent } from './upcoming-events-weather.component';

describe('UpcomingEventsWeatherComponent', () => {
  let component: UpcomingEventsWeatherComponent;
  let fixture: ComponentFixture<UpcomingEventsWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingEventsWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingEventsWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
