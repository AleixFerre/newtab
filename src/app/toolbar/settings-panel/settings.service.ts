import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { defaultSettings } from './settings-defaults.model';
import { Settings } from './settings.model';

const SETTINGS_ID = 'settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public updatedSettings$: Subject<Settings>;

  constructor() {
    this.updatedSettings$ = new Subject<Settings>();
  }

  public getAllSettings(): Settings {
    const settings = localStorage.getItem(SETTINGS_ID);
    return JSON.parse(settings ?? '{}') as Settings;
  }

  /**
   * Checks if there is already Settings in localStorage.
   *
   * If there's none, it initializes with default values;
   * else it returns the existing Settings.
   */
  public getSettingsInitDefault(): Settings {
    const settings = this.getAllSettings();
    if (!settings.language) {
      this.restoreDefaultSettings();
      return defaultSettings;
    }
    return settings;
  }

  public restoreDefaultSettings(): void {
    localStorage.removeItem(SETTINGS_ID);
    this.updateSettings(defaultSettings);
  }

  /**
   * Updates the Settings in localStorage.
   *
   * @returns A string if there's an error, else null.
   */
  public updateSettings(settings: Settings): string | null {
    try {
      localStorage.setItem(SETTINGS_ID, JSON.stringify(settings));
      this.updatedSettings$.next(settings);
      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (typeof error === 'string') {
        return error;
      } else if (error instanceof Error) {
        return error.message;
      } else {
        return 'Unknown error';
      }
    }
  }
}
