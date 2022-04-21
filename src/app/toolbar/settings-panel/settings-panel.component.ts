import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarksService } from 'src/app/bookmarks/bookmarks.service';
import { Settings } from './settings.model';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
})
export class SettingsPanelComponent {
  settings: Settings;
  confirmDiscard = false;

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
