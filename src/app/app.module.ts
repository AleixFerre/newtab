import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkItemComponent } from './bookmarks/bookmark-item/bookmark-item.component';
import { ClockComponent } from './clock/clock.component';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkItemNewComponent } from './bookmarks/bookmark-item-new/bookmark-item-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BookmarksComponent,
    BookmarkItemComponent,
    ClockComponent,
    BookmarkItemNewComponent,
  ],
  imports: [BrowserModule, MatIconModule, HttpClientModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
