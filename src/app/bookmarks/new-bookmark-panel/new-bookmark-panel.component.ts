import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { urlRegex } from '../bookmark-defaults.model';
import { Bookmark } from '../bookmark-item/bookmark.model';

@Component({
  selector: 'app-new-bookmark-panel',
  imports: [
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
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
      name: this.titleControl.value!,
      url: this.normalizeURL(this.urlControl.value!),
    });
  }

  normalizeURL(value: string): string {
    return value.replace('http://', '').replace('https://', '');
  }

  close() {
    this.dialogRef.close();
  }
}
