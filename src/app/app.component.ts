import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hour: string = '';
  min: string = '';
  date: string = '';

  backgroundStyle = `url(${environment.root}assets/backgrounds/${this.getRandom(
    3
  )}.jpg)`;

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime(): void {
    this.hour = new Date().getHours().toString();
    this.hour = this.hour.length === 1 ? '0' + this.hour : this.hour;
    this.min = new Date().getMinutes().toString();
    this.date = new Date().toLocaleDateString();
  }

  // Returns a random number between 1 and n as a string
  getRandom(n: number): string {
    return (Math.floor(Math.random() * n) + 1).toString();
  }
}
