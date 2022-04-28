import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TimedWeatherResponse,
  WeatherResponse,
} from '../models/weather-response.model';

const API_LINK = `${environment.API_LINK}api/weather/`;
const RELOAD_TIME = 1000 * 60 * 60; // 1 hour

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  public getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    const weather = this.getLocalWeather();

    if (
      weather.timestamp &&
      new Date().getTime() - new Date(weather.timestamp).getTime() < RELOAD_TIME
    ) {
      return new Observable((observer) => {
        observer.next(weather);
        observer.complete();
      });
    }

    const weatherObservable = environment.production
      ? this.httpClient.post<WeatherResponse>(API_LINK, { lat, lon })
      : this.testingWeather();

    weatherObservable.subscribe((weather) => {
      this.setLocalWeather(weather);
    });

    return weatherObservable;
  }

  private testingWeather(): Observable<WeatherResponse> {
    return this.httpClient.post<WeatherResponse>(
      `${environment.API_LINK}api/test/`,
      { lat: 0, lon: 0 }
    );
  }

  private getLocalWeather(): TimedWeatherResponse {
    return JSON.parse(localStorage.getItem('weather') ?? '{}');
  }

  private setLocalWeather(weather: WeatherResponse): void {
    const timedWeather: TimedWeatherResponse = {
      ...weather,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('weather', JSON.stringify(timedWeather));
  }
}
