import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  backgroundStyle = '';
  backgroundQuality = '4k';

  ngOnInit(): void {
    this.backgroundStyle = `url(${environment.root}assets/backgrounds/${this.backgroundQuality}/1.jpg)`;
  }

  // Returns a random number between 1 and n
  getRandom(n: number): number {
    return Math.floor(Math.random() * n) + 1;
  }
}
