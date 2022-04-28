import {
  ClockDateFormat,
  ClockHourFormat,
  Language,
  Settings,
  WeatherTheme,
  WeatherUnit,
} from './settings.model';

export const defaultSettings: Settings = {
  language: Language.ENGLISH,
  clock: {
    showSeconds: true,
    hourFormat: ClockHourFormat.H24,
    dateFormat: ClockDateFormat.FULL,
  },
  weather: {
    show: true,
    location: 'auto',
    units: WeatherUnit.Celcius,
    theme: WeatherTheme.FULL,
  },
  background: {
    pick: 'random',
  },
};
