import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  hour = '';
  min = '';
  sec = '';
  date = '';

  ngOnInit(): void {
    this.updateTime(); // First time loading the page
    setTimeout(() => {
      this.updateTime(); // After waiting to the end of the second
      setInterval(() => {
        this.updateTime(); // Every second
      }, 1000);
    }, this.getRemaningSecond());
  }

  getRemaningSecond() {
    const now = new Date();
    const nextSecond = now;
    nextSecond.setSeconds(now.getSeconds() + 1);
    return nextSecond.getTime() - now.getTime();
  }

  updateTime(): void {
    this.hour = new Date().getHours().toString();
    this.hour = this.hour.length === 1 ? `0${this.hour}` : this.hour;
    this.min = new Date().getMinutes().toString();
    this.min = this.min.length === 1 ? `0${this.min}` : this.min;
    this.sec = new Date().getSeconds().toString();
    this.sec = this.sec.length === 1 ? `0${this.sec}` : this.sec;
    this.date = new Date().toLocaleDateString();
  }
}
