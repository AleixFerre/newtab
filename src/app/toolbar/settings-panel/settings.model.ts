export interface Settings {
  language: Language;
  clock: {
    showSeconds: boolean;
    hourFormat: ClockHourFormat;
    dateFormat: ClockDateFormat;
  };
  weather: {
    show: boolean;
    location: { latitude: number; longitude: number } | 'auto';
    units: WeatherUnit;
    theme: WeatherTheme;
  };
  background: {
    pick: number | 'random';
  };
}

export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  CATALAN = 'ca',
}

export enum ClockHourFormat {
  H12 = '12h',
  H24 = '24h',
}

export enum ClockDateFormat {
  FULL = 'full',
  COMPACT = 'compact',
}

export enum WeatherTheme {
  FULL = 'full',
  COMPACT = 'compact',
}

export enum WeatherUnit {
  Kelvin = 'standard',
  Celcius = 'metric',
  Fahrenheit = 'imperial',
}
