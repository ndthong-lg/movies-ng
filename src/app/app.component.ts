import { Component } from '@angular/core';
import {SearchData} from "./movie-search/movie-search.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Movies Go'
  searching = false

  onSearch(data: SearchData) {

  }
}
