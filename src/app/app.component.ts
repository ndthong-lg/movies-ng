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
  movie_search_result: any = undefined
  movie_search_error: any = undefined

  now_showing_searching = false
  now_showing_result: any = undefined
  now_showing_error: any = undefined

  constructor(private movieSearcher: TheMovieDbSearchService,
              private nowShowingSearcher: MovieGluSearchService) {
    this.movieSearcher.api_key = environment.the_movie_db_apikey
    this.nowShowingSearcher.api_key = environment.movie_glu_apikey
    this.nowShowingSearcher.auth = environment.movie_glu_auth
  }

  onSearchMovieComplete(result: any) {
    this.movie_searching = false
    this.movie_search_result = result
  }

  onSearchMovieError(msg: string) {
    this.movie_searching = false
    this.movie_search_error = msg
  }

  onSearchMovie(data: SearchData) {
    this.movie_search_result = undefined
    this.movie_searching = true
    this.movieSearcher.search(data)
      .subscribe({
        next: (data) => this.onSearchMovieComplete(data),
        error: (err) => this.onSearchMovieError(err.message),
      })
  }

  onSearchNowShowingComplete(result: any) {
    this.now_showing_searching = false
    this.now_showing_result = result
  }

  onSearchNowShowingError(msg: string) {
    this.now_showing_searching = false
    this.now_showing_error = msg
  }

  onSearchNowShowing() {
    this.now_showing_result = undefined
    this.now_showing_searching = true
    this.nowShowingSearcher.searchNowShowing().subscribe(
      (data) => this.onSearchNowShowingComplete(data),
      (err) => this.onSearchNowShowingError(err)
    )
  }
}
