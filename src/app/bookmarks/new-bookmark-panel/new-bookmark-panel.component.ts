import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BookmarksService } from '../bookmarks.service';

const urlRegex = '([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-new-bookmark-panel',
  templateUrl: './new-bookmark-panel.component.html',
  styleUrls: ['./new-bookmark-panel.component.scss'],
})
export class NewBookmarkPanelComponent {
  titleControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  urlControl = new FormControl('', [
    Validators.required,
    Validators.pattern(urlRegex),
  ]);

  constructor(
    private dialogRef: MatDialogRef<NewBookmarkPanelComponent>,
    private bookmarksService: BookmarksService
  ) {}

  saveAndCloseSettings() {
    if (!this.titleControl.valid || !this.urlControl.valid) {
      this.titleControl.markAllAsTouched();
      this.urlControl.markAllAsTouched();
      return;
    }

    this.bookmarksService.addBookmark({
      name: this.titleControl.value,
      url: this.normalizeURL(this.urlControl.value),
    });

    this.close();
  }

  normalizeURL(value: string): string {
    return `https://www.${value}`;
  }

  close() {
    this.dialogRef.close();
  }
}
