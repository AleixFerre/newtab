import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Settings } from './toolbar/settings-panel/settings.model';
import { SettingsService } from './toolbar/settings-panel/settings.service';

@Component({
  selector: 'app-root',
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
    this.backgroundStyle = `url(${environment.root}assets/backgrounds/1.jpg)`;
  }

  // Returns a random number between 1 and n
  getRandom(n: number): number {
    return Math.floor(Math.random() * n) + 1;
  }
}
