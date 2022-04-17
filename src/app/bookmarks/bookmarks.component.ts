import { Component, OnInit } from '@angular/core';
import { Bookmark } from './bookmark-item/bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(
    private bookmarksService: BookmarksService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarksService.getBookmarksInitDefault();
    this.bookmarksService.onUpdateBookmarks.subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer.data.index === event.container.data.index) {
      return;
    }

    this.bookmarks[event.previousContainer.data.index] =
      event.container.data.item;
    this.bookmarks[event.container.data.index] =
      event.previousContainer.data.item;
    const message = this.bookmarksService.updateBookmarks(this.bookmarks);
    this.openSnackBar(message ?? 'Bookmarks updated successfully');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }
}
