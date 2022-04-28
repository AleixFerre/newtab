import { Pipe, PipeTransform } from '@angular/core';
import { WeatherUnit } from 'src/app/toolbar/settings-panel/settings.model';
import { SettingsService } from 'src/app/toolbar/settings-panel/settings.service';

@Pipe({
  name: 'ntTemperature',
  pure: false,
})
export class NtTemperaturePipe implements PipeTransform {
  constructor(private settingsService: SettingsService) {}

  transform(temperature: number): string {
    const { weather } = this.settingsService.getAllSettings();

    if (weather.units === WeatherUnit.Celcius) {
      return `${this.fromKelvinToCelsius(temperature)}°C`;
    }
    if (weather.units === WeatherUnit.Fahrenheit) {
      return `${this.fromKelvinToFahrenheit(temperature)}°F`;
    }
    return `${temperature}°K`;
  }

  private fromKelvinToFahrenheit(temp: number): number {
    return this.roundTo((temp - 273.15) * 1.8 + 32, 2);
  }

  private fromKelvinToCelsius(temp: number): number {
    return this.roundTo(temp - 273.15, 2);
  }

  private roundTo(value: number, precision = 0): number {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }
}
