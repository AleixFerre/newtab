import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarksService } from '../bookmarks.service';
import { NewBookmarkPanelComponent } from '../new-bookmark-panel/new-bookmark-panel.component';
import { Bookmark } from './bookmark.model';

@Component({
  selector: 'app-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
})
export class BookmarkItemComponent implements OnInit {
  @Input() bookmark!: Bookmark;
  @Input() index!: number;
  faviconUrl = '';

  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;

  constructor(
    private dialog: MatDialog,
    private bookmarksService: BookmarksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.faviconUrl = `https://icon.horse/icon/${this.bookmark.url}`;
  }

  onRightClick(event: MouseEvent, bookmark: Bookmark) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    this.matMenuTrigger.menuData = { bookmark };
    this.matMenuTrigger.openMenu();
  }

  editBookmark() {
    this.matMenuTrigger.closeMenu();

    this.dialog
      .open(NewBookmarkPanelComponent, {
        data: { bookmark: this.bookmark },
      })
      .afterClosed()
      .subscribe((updatedBookmark: Bookmark) => {
        if (updatedBookmark) {
          this.bookmarksService.updateBookmark(this.index, updatedBookmark);
        }
      });
  }

  removeBookmark() {
    this.matMenuTrigger.closeMenu();
    const bookmarksCache = this.bookmarksService.getAllBookmarks();
    this.bookmarksService.removeBookmark(this.index);
    this.snackBar
      .open('Bookmark removed successfully', 'UNDO', {
        duration: 5000,
      })
      .onAction()
      .subscribe(() => {
        this.bookmarksService.updateBookmarks(bookmarksCache);
      });
  }
}
