import { Component } from '@angular/core';
import {SearchData} from "./movie-search/movie-search.component";
import {TheMovieDbSearchService} from "./themoviedb-search.service";
import {MovieGluSearchService} from "./movieglu-search.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Movies Go'
  movie_searching = false
  now_showing_searching = false

  constructor(private movieSearcher: TheMovieDbSearchService,
              private nowShowingSearcher: MovieGluSearchService) {
    this.movieSearcher.api_key = environment.the_movie_db_apikey
    this.nowShowingSearcher.api_key = environment.movie_glu_apikey
    this.nowShowingSearcher.auth = environment.movie_glu_auth
  }

  onSearchMovieComplete(result: any) {
    this.movie_searching = false
    console.log(result)
  }

  onSearchMovieError(msg: string) {
    this.movie_searching = false
    console.log(msg)
  }

  onSearchMovie(data: SearchData) {
    this.movie_searching = true
    this.movieSearcher.search(data)
      .subscribe({
        next: (data) => this.onSearchMovieComplete(data),
        error: (err) => this.onSearchMovieError(err.message),
      })
  }

  onSearchNowShowingComplete(result: any) {
    this.now_showing_searching = false
    console.log(result)
  }

  onSearchNowShowingError(msg: string) {
    this.now_showing_searching = false
    console.log(msg)
  }

  onSearchNowShowing() {
    this.now_showing_searching = true
    this.nowShowingSearcher.searchNowShowing().subscribe(
      (data) => this.onSearchNowShowingComplete(data),
      (err) => this.onSearchNowShowingError(err)
    )
  }
}
