import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bookmark } from '../bookmark-item/bookmark.model';

const urlRegex = '([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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
    @Inject(MAT_DIALOG_DATA) private data: { bookmark: Bookmark }
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
      url: this.urlControl.value,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
