import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ClockComponent } from './clock/clock.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Settings } from './toolbar/settings-panel/settings.model';
import { SettingsService } from './toolbar/settings-panel/settings.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

@Component({
  selector: 'app-root',
  imports: [
    SearchBarComponent,
    ToolbarComponent,
    BookmarksComponent,
    ClockComponent,
    WeatherWidgetComponent,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  backgroundStyle = '';
  settings!: Settings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settings = this.settingsService.getSettingsInitDefault();
    this.settingsService.updatedSettings$.subscribe((settings) => {
      this.settings = settings;
    });
    this.backgroundStyle = `url(${environment.root}assets/backgrounds/1.webp)`;
  }
}
