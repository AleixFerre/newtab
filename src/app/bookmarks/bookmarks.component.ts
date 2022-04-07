import { Component, OnInit } from '@angular/core';
import defaultBookmarks from './bookmark-defaults.model';
import { Bookmark } from './bookmark-item/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor() {}

  ngOnInit(): void {
    this.bookmarks = defaultBookmarks;
  }
}
