import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookmarksService } from 'src/app/bookmarks/bookmarks.service';
import { Settings, WeatherUnit } from './settings.model';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings-panel',
  imports: [
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    KeyValuePipe,
  ],
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
})
export class SettingsPanelComponent {
  settings: Settings;
  confirmDiscard = false;
  WEATHER_UNITS = WeatherUnit;

  constructor(
    private dialogRef: MatDialogRef<SettingsPanelComponent>,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService,
    private bookmarksService: BookmarksService
  ) {
    this.settings = this.settingsService.getAllSettings();
    this.settingsService.updatedSettings$.subscribe((settings) => {
      this.settings = settings;
    });
  }

  closeSettings() {
    this.dialogRef.close();
  }

  saveAndCloseSettings() {
    this.settingsService.updateSettings(this.settings);
    this.dialogRef.close('Settings updated successfully');
  }

  toggleShowWeatherShow() {
    this.settings.weather.show = !this.settings.weather.show;
  }

  changeWeatherUnits(newUnit: WeatherUnit) {
    this.settings.weather.units = newUnit;
  }

  restoreDefaultBookmarks() {
    const currentBookmarks = this.bookmarksService.getAllBookmarks();
    this.bookmarksService.restoreDefaultBookmarks();
    this.closeSettings();
    this.snackBar
      .open('Default bookmarks restored successfully', 'UNDO', {
        duration: 10000,
      })
      .onAction()
      .subscribe(() => {
        this.bookmarksService.updateBookmarks(currentBookmarks);
      });
  }

  restoreDefaultSettings() {
    const currentSettings = this.settingsService.getAllSettings();
    this.settingsService.restoreDefaultSettings();
    this.snackBar
      .open('Default settings restored successfully', 'UNDO', {
        duration: 10000,
      })
      .onAction()
      .subscribe(() => {
        this.settingsService.updateSettings(currentSettings);
      });
  }
}
