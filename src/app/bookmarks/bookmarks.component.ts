import { Component, OnInit } from '@angular/core';
import { Bookmark } from './bookmark-item/bookmark.model';
import { BookmarksService } from './bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.bookmarksService.addDefaultBookmarksIfFirstEntry();
    this.bookmarks = this.bookmarksService.getAllBookmarks();
  }
}
