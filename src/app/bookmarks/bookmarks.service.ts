import { Injectable } from '@angular/core';
import defaultBookmarks from './bookmark-defaults.model';
import { Bookmark } from './bookmark-item/bookmark.model';

const BOOKMARKS_ID = 'bookmarks';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  public getBookmark(id: number): Bookmark {
    const bookmarkJSON = localStorage.getItem(id.toString());
    return JSON.parse(bookmarkJSON ?? '{}') as Bookmark;
  }

  public addBookmark(bookmark: Bookmark): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks.push(bookmark);
    this.updateBookmarks(bookmarks);
  }

  public getAllBookmarks(): Bookmark[] {
    return JSON.parse(localStorage.getItem(BOOKMARKS_ID) ?? '[]') as Bookmark[];
  }

  /**
   * Checks if there is already Bookmarks in localStorage.
   *
   * If there's none, it initializes with default values;
   * else it returns the existing Bookmarks.
   */
  public getBookmarksInitDefault(): Bookmark[] {
    const bookmarks = this.getAllBookmarks();
    if (bookmarks.length === 0) {
      this.restoreDefaultBookmarks();
      return defaultBookmarks;
    }
    return bookmarks;
  }

  public restoreDefaultBookmarks(): void {
    localStorage.removeItem(BOOKMARKS_ID);
    localStorage.setItem(BOOKMARKS_ID, JSON.stringify(defaultBookmarks));
  }

  public removeBookmark(id: number): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks.splice(id, 1);
    this.updateBookmarks(bookmarks);
  }

  public editBookmark(index: number, bookmark: Bookmark): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks[index] = bookmark;
    this.updateBookmarks(bookmarks);
  }

  public moveBookmark(from: number, to: number): void {
    const bookmarks = this.getAllBookmarks();
    const bookmark = bookmarks.splice(from, 1)[0];
    bookmarks.splice(to, 0, bookmark);
    this.updateBookmarks(bookmarks);
  }

  private updateBookmarks(bookmarks: Bookmark[]): void {
    localStorage.setItem(BOOKMARKS_ID, JSON.stringify(bookmarks));
  }
}
