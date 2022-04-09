import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkItemComponent } from './bookmarks/bookmark-item/bookmark-item.component';
import { ClockComponent } from './clock/clock.component';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkItemNewComponent } from './bookmarks/bookmark-item-new/bookmark-item-new.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SettingsPanelComponent } from './toolbar/settings-panel/settings-panel.component';
import { NewBookmarkPanelComponent } from './bookmarks/new-bookmark-panel/new-bookmark-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BookmarksComponent,
    BookmarkItemComponent,
    ClockComponent,
    BookmarkItemNewComponent,
    SettingsPanelComponent,
    NewBookmarkPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    DragDropModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
