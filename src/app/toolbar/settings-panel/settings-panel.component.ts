import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.getAllSettings();
  }

  closeSettings() {
    this.dialogRef.close();
  }

  saveAndCloseSettings() {
    this.settingsService.updateSettings(this.settings);
    this.dialogRef.close('Settings updated successfully');
  }
}
