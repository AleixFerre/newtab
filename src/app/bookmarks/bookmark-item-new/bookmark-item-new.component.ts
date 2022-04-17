import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewBookmarkPanelComponent } from '../new-bookmark-panel/new-bookmark-panel.component';

@Component({
  selector: 'app-bookmark-item-new',
  templateUrl: './bookmark-item-new.component.html',
  styleUrls: ['./bookmark-item-new.component.scss'],
})
export class BookmarkItemNewComponent {
  constructor(private dialog: MatDialog) {}

  newBookmarkClick() {
    this.dialog
      .open(NewBookmarkPanelComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }
}
