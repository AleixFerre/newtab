import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  time: string = '';
  date: string = '';

  backgroundClass = `background bg-${this.getRandom(3)}`;

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime(): void {
    this.time = new Date().toLocaleTimeString();
    this.date = new Date().toLocaleDateString();
  }

  // Returns a random number between 1 and n as a string
  getRandom(n: number): string {
    return (Math.floor(Math.random() * n) + 1).toString();
  }
}
