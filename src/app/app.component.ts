import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SettingsService } from './toolbar/settings-panel/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  backgroundStyle = '';

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.settingsInitDefault();
    this.backgroundStyle = `url(${environment.root}assets/backgrounds/1.jpg)`;
  }

  // Returns a random number between 1 and n
  getRandom(n: number): number {
    return Math.floor(Math.random() * n) + 1;
  }
}
