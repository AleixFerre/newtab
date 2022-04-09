import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bookmark-item-new',
  templateUrl: './bookmark-item-new.component.html',
  styleUrls: ['./bookmark-item-new.component.scss'],
})
export class BookmarkItemNewComponent {
  @Output() click = new EventEmitter();

  newBookmarkClick() {
    this.click.emit();
  }
}
