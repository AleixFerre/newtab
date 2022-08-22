import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchString = '';

  search() {
    window.location.href = `https://www.google.com/search?q=${this.searchString}`;
  }
}
