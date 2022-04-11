import { Component, OnInit } from '@angular/core';
import { WeatherResponse } from './models/weather-response.model';
import { GeolocalizationService } from './services/geolocalization.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  info!: WeatherResponse;
  isLoading = true;

  constructor(
    private weatherService: WeatherService,
    private geolocalizationService: GeolocalizationService
  ) {}

  ngOnInit(): void {
    this.geolocalizationService
      .getPosition()
      .subscribe((crd: GeolocationPosition) => {
        this.weatherService
          .getWeather(crd.coords.latitude, crd.coords.longitude)
          .subscribe((data) => {
            this.info = data;
            this.isLoading = false;
          });
      });
  }

  fromKelvinToFahrenheit(temp: number): number {
    return Math.round((temp - 273.15) * 1.8 + 32);
  }

  fromKelvinToCelsius(temp: number): number {
    return Math.round(temp - 273.15);
  }
}
