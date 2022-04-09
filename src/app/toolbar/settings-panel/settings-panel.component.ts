import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.scss'],
})
export class SettingsPanelComponent {

  confirmDiscard = false;

  constructor(private dialogRef: MatDialogRef<SettingsPanelComponent>) {}

  closeSettings() {
    this.dialogRef.close();
  }

  saveAndCloseSettings() {
    this.dialogRef.close('Settings updated successfully');
  }
}
