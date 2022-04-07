import { Injectable } from '@angular/core';
import defaultBookmarks from './bookmark-defaults.model';
import { Bookmark } from './bookmark-item/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  constructor() {}

  public getBookmark(id: number): Bookmark {
    const bookmarkJSON = localStorage.getItem(id.toString());
    return JSON.parse(bookmarkJSON ?? '{}') as Bookmark;
  }

  public addBookmark(bookmark: Bookmark): void {
    localStorage.setItem(bookmark.id.toString(), JSON.stringify(bookmark));
  }

  public addDefaultBookmarks(): void {
    defaultBookmarks.forEach((bookmark) => {
      localStorage.setItem(bookmark.id.toString(), JSON.stringify(bookmark));
    });
  }

  public removeBookmark(id: number): void {
    localStorage.removeItem(id.toString());
  }

  public editBookmark(bookmark: Bookmark): void {
    localStorage.setItem(bookmark.id.toString(), JSON.stringify(bookmark));
  }
}
