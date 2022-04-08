import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Component({
  selector: 'app-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss'],
})
export class BookmarkItemComponent implements OnInit {
  @Input() bookmark!: Bookmark;

  faviconUrl = '';

  ngOnInit(): void {
    this.faviconUrl = `https://icon.horse/icon/${this.removeHttpFrom(
      this.bookmark.url
    )}`;
  }

  removeHttpFrom(url: string): string {
    return url.replace('http://www.', '').replace('https://www.', '');
  }
}
