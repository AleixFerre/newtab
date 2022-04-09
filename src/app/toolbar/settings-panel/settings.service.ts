import { Injectable } from '@angular/core';
import { defaultSettings } from './bookmark-defaults.model';
import { Setting } from './setting.model';

const SETTINGS_ID = '';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public getAllSettings(): Setting[] {
    return JSON.parse(localStorage.getItem(SETTINGS_ID) ?? '[]') as Setting[];
  }

  /**
   * Checks if there is already Settings in localStorage.
   *
   * If there's none, it initializes with default values;
   * else it returns the existing Settings.
   */
  public getSettingsInitDefault(): Setting[] {
    const settings = this.getAllSettings();
    if (settings.length === 0) {
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
  public updateSettings(settings: Setting[]): string | null {
    try {
      localStorage.setItem(SETTINGS_ID, JSON.stringify(settings));
      return null;
    } catch (error) {
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
