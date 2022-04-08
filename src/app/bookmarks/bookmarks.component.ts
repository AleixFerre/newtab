import { Component, OnInit } from '@angular/core';
import { Bookmark } from './bookmark-item/bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarksService.getBookmarksInitDefault();
  }

  drop(event: CdkDragDrop<any>) {
    this.bookmarks[event.previousContainer.data.index] =
      event.container.data.item;
    this.bookmarks[event.container.data.index] =
      event.previousContainer.data.item;
  }
}
