import { Component } from '@angular/core';
import {SearchData} from "./movie-search/movie-search.component";
import {TheMovieDbSearchService} from "./themoviedb-search.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Movies Go'
  searching = false

  constructor(private searcher: TheMovieDbSearchService) {
    this.searcher.api_key = environment.the_movie_db_apikey
  }

  onSearchComplete(result: any) {
    this.searching = false
    console.log(result)
  }

  onSearchError(msg: string) {
    this.searching = false
    console.log(msg)
  }

  onSearch(data: SearchData) {
    this.searching = true
    this.searcher.search(data)
      .subscribe({
        next: (data) => this.onSearchComplete(data),
        error: (err) => this.onSearchError(err.message),
      })
  }
}
