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
  message = 'Loading...';
  isLoading = true;

  constructor(
    private weatherService: WeatherService,
    private geolocalizationService: GeolocalizationService
  ) {}

  ngOnInit(): void {
    this.geolocalizationService.getPosition().subscribe({
      next: (crd: GeolocationPosition) => {
        this.weatherService
          .getWeather(crd.coords.latitude, crd.coords.longitude)
          .subscribe((data) => {
            this.info = data;
            this.message = 'Widget ready!';
            this.isLoading = false;
          });
      },
      error: () => {
        this.message = "Couldn't get your location";
      },
    });
  }
}
