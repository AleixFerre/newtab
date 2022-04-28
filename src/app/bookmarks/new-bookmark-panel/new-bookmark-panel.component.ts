import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bookmark } from '../bookmark-item/bookmark.model';

const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

@Component({
  selector: 'app-new-bookmark-panel',
  templateUrl: './new-bookmark-panel.component.html',
  styleUrls: ['./new-bookmark-panel.component.scss'],
})
export class NewBookmarkPanelComponent implements OnInit {
  titleControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  urlControl = new FormControl('', [
    Validators.required,
    Validators.pattern(urlRegex),
  ]);

  constructor(
    private dialogRef: MatDialogRef<NewBookmarkPanelComponent, Bookmark>,
    @Inject(MAT_DIALOG_DATA) public data: { bookmark: Bookmark }
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.titleControl.setValue(this.data.bookmark.name);
      this.urlControl.setValue(this.data.bookmark.url);
    }
  }

  saveAndCloseSettings() {
    if (!this.titleControl.valid || !this.urlControl.valid) {
      this.titleControl.markAllAsTouched();
      this.urlControl.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      name: this.titleControl.value,
      url: this.normalizeURL(this.urlControl.value),
    });
  }

  normalizeURL(value: string): string {
    return value.replace('http://', '').replace('https://', '');
  }

  close() {
    this.dialogRef.close();
  }
}
