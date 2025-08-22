import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';

@Component({
  selector: 'app-toolbar',
  imports: [MatIconModule, MatIconButton, MatDialogModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  openSettings() {
    this.dialog
      .open(SettingsPanelComponent, {
        width: '50%',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.snackBar.open(result, 'OK', {
            duration: 5000,
          });
        }
      });
  }
}
