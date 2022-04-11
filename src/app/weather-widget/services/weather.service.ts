import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherResponse } from '../models/weather-response.model';

const API_LINK = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=`;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  public getWeather(lat: number, lon: number): Observable<WeatherResponse> {
    const link =
      API_LINK.replace('{lat}', lat.toString()).replace(
        '{lon}',
        lon.toString()
      ) + environment.API_KEY;
    return this.httpClient.get<WeatherResponse>(link);
  }
}
