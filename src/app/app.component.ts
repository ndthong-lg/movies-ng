import { Component, OnInit } from '@angular/core';
import {SearchData} from "./movie-search/movie-search.component";
import {TheMovieDbSearchService} from "./themoviedb-search.service";
import {MovieGluSearchService} from "./movieglu-search.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Movies Go'
  movie_searching = false
  movie_search_data: any = undefined
  movie_search_result: any = undefined
  movie_search_error: any = undefined
  movie_search_paths: string[] = []
  movie_search_genres: any = {}

  now_showing_searching = false
  now_showing_result: any = undefined
  now_showing_error: any = undefined

  constructor(private movieSearcher: TheMovieDbSearchService,
              private nowShowingSearcher: MovieGluSearchService) {
    this.movieSearcher.api_key = environment.the_movie_db_apikey
    this.nowShowingSearcher.api_key = environment.movie_glu_apikey
    this.nowShowingSearcher.auth = environment.movie_glu_auth
  }

  ngOnInit() {
    this.movieSearcher.getConfiguration().subscribe((config) => {
      this.movie_search_paths.push(config.getPosterBaseURL(),
        config.getProfileBaseURL(), config.getLogoBaseURL())
    })

    this.movieSearcher.getGenres().subscribe( (genres) => {
      this.movie_search_genres = genres
    })
  }

  onSearchMovieRetry() {
    if (this.movie_search_data)
      this.onSearchMovie(this.movie_search_data)
  }

  onSearchMoviePage(page: number) {
    if (this.movie_search_data)
      this.onSearchMovie(this.movie_search_data, page)
  }

  onSearchMovieComplete(result: any) {
    this.movie_searching = false
    this.movie_search_result = result
  }

  onSearchMovieError(msg: string) {
    this.movie_searching = false
    this.movie_search_error = msg
  }

  onSearchMovie(data: SearchData, page: number = 1) {
    this.movie_search_data = Object.assign({}, data)
    this.movie_search_data.page = page
    this.movie_search_result = undefined
    this.movie_searching = true
    this.movieSearcher.search(this.movie_search_data)
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
