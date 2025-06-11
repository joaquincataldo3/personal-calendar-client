import { Component, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IEvent, IForecastData, IUserSetting } from '../../../interfaces/interfaces';
import { toLocalDate as toLocalDateHelper } from '../../utils/datesHelper';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upcoming-events-weather',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './upcoming-events-weather.component.html',
  styleUrl: './upcoming-events-weather.component.css'
})
export class UpcomingEventsWeatherComponent {

  @Input() events: IEvent[] = [];
  @Input() settings: IUserSetting | null = null;
  city!:string;
  forecastData: IForecastData[] = [];
  API_KEY = environment.openWeatherApiKey;
  isLoading = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchWeather();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events'] || changes['settings']) {
      this.city = this.settings?.location || 'Buenos Aires';
      this.forecastData = [];
      this.fetchWeather();
    }
  }

  fetchWeather(): void {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${environment.openWeatherApiKey}&units=metric`;
    this.isLoading = true,
    this.http.get<any>(apiUrl)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(response => {
      const list = response.list;
      const today = new Date();

      this.forecastData = [];
      for (let offset = 0; offset <= 2; offset++) {
        const date = new Date(today);
        date.setDate(date.getDate() + offset);
        date.setHours(0, 0, 0, 0);
        const dayStr = date.toDateString();

        const forecasts = list.filter((entry: any) => {
          const dt = toLocalDateHelper(entry.dt_txt);
          return dt.toDateString() === dayStr;
        });
        
        const temps = forecasts.map((f: any) => f.main.temp);
        const icons = forecasts.map((f: any) => f.weather[0].icon);

        const dailyEvents = this.events.filter(ev => {
          const local = toLocalDateHelper(ev.start_time);
          return local.toDateString() === dayStr;
        });

        const minTemp = temps.length > 0 ? Math.round(Math.min(...temps)) : null;
        const maxTemp = temps.length > 0 ? Math.round(Math.max(...temps)) : null;

        this.forecastData.push({
          date,
          label: this.getLabel(offset, date),
          minTemp,
          maxTemp,
          weatherIcon: icons[4] || icons[0] || '01d',
          events: dailyEvents
        });
      }
    });
  }

  getLabel(offset: number, date: Date): string {
    if (offset === 0) return 'Today';
    if (offset === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-EN', { weekday: 'long', day: 'numeric', month: 'numeric' });
  }

  toLocalDate(date: Date): Date {
    return toLocalDateHelper(date);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const check = new Date(date);
    check.setHours(0, 0, 0, 0);

    return today.getTime() === check.getTime();
  }

}
