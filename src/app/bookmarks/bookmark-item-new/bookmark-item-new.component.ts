import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Bookmark } from '../bookmark-item/bookmark.model';
import { BookmarksService } from '../bookmarks.service';
import { NewBookmarkPanelComponent } from '../new-bookmark-panel/new-bookmark-panel.component';

@Component({
  selector: 'app-bookmark-item-new',
  imports: [MatIconModule, MatButton],
  templateUrl: './bookmark-item-new.component.html',
  styleUrls: ['./bookmark-item-new.component.scss'],
})
export class BookmarkItemNewComponent {
  constructor(
    private dialog: MatDialog,
    private bookmarksService: BookmarksService
  ) {}

  newBookmarkClick() {
    this.dialog
      .open(NewBookmarkPanelComponent)
      .afterClosed()
      .subscribe((bookmark: Bookmark) => {
        if (bookmark) {
          this.bookmarksService.addBookmark(bookmark);
        }
      });
  }
}
