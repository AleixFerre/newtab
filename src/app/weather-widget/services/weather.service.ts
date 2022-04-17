import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherResponse } from '../models/weather-response.model';

const API_LINK = `${environment.API_LINK}api/weather/`;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  public getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    return environment.production
      ? this.httpClient.post<WeatherResponse>(API_LINK, { lat, lon })
      : this.testingWeather();
  }

  private testingWeather(): Observable<WeatherResponse> {
    return this.httpClient.post<WeatherResponse>(
      `${environment.API_LINK}api/test/`,
      { lat: 0, lon: 0 }
    );
  }
}
