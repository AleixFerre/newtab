import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { defaultBookmarks } from './bookmark-defaults.model';
import { Bookmark } from './bookmark-item/bookmark.model';

const BOOKMARKS_ID = 'bookmarks';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  public onUpdateBookmarks = new Subject<Bookmark[]>();

  public addBookmark(bookmark: Bookmark): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks.push(bookmark);
    this.updateBookmarks(bookmarks);
  }

  public duplicateBookmark(id: number): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks.splice(id + 1, 0, bookmarks[id]);
    this.updateBookmarks(bookmarks);
  }

  public removeBookmark(index: number): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks.splice(index, 1);
    this.updateBookmarks(bookmarks);
  }

  public updateBookmark(index: number, bookmark: Bookmark): void {
    const bookmarks = this.getAllBookmarks();
    bookmarks[index] = bookmark;
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
    this.updateBookmarks(defaultBookmarks);
  }

  /**
   * Updates the Bookmarks in localStorage.
   *
   * @returns A string if there's an error, else null.
   */
  public updateBookmarks(bookmarks: Bookmark[]): string | null {
    try {
      localStorage.setItem(BOOKMARKS_ID, JSON.stringify(bookmarks));
      this.onUpdateBookmarks.next(bookmarks);
      return null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (typeof error === 'string') {
        return error;
      } else if (error instanceof Error) {
        return error.message;
      } else {
        return 'Unknown error';
      }
    }
  }
}
