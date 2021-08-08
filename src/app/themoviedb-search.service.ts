import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbSearchService {

  set api_key(key: string) {
    this.options.params.api_key = key
  }

  options = {
    observe: 'body' as const,
    responseType: 'json' as const,
    params: {
      api_key: '',
      page: 1,
      include_adult: false,
      query: '',
    }
  }

  configuration: any

  constructor(private http: HttpClient) { }

  private configurationURL = 'https://api.themoviedb.org/3/configuration'
  getConfiguration(): Observable<any> {
    return this.http.get(`${this.configurationURL}?api_key=${this.options.params.api_key}`)
      .pipe(
        map( (data) => {
          this.configuration = JSON.parse(JSON.stringify(data))
          this.configuration.getProfileBaseURL = function() {
            return `${this.images.base_url}/${this.images.profile_sizes[0]}`
          }
          this.configuration.getLogoBaseURL = function() {
            return `${this.images.base_url}/${this.images.logo_sizes[0]}`
          }
          this.configuration.getPosterBaseURL = function() {
            return `${this.images.base_url}/${this.images.poster_sizes[0]}`
          }
          return this.configuration
        } ),
        catchError( (err) => {
          console.log(`${err.status} - ${err.statusText}: ${err.error.status_message}`)
          return of([])
        })
      )
  }

  private genresURL = 'https://api.themoviedb.org/3/genre/movie/list'
  getGenres(): Observable<any> {
    return this.http.get(`${this.genresURL}?api_key=${this.options.params.api_key}`)
      .pipe(
        map( (data) => JSON.parse(JSON.stringify(data)).genres ),
        catchError((err) => {
          console.log(`${err.status} - ${err.statusText}: ${err.error.status_message}`)
          return of([])
        })
      )
  }

  search(data: any): Observable<any> {
    this.options.params.query = data.keyword
    this.options.params.page = data.page || 1
    let response: Observable<any>
    if (data.searchType === 'title')
      response = this.searchTitle()
    else if (data.searchType === 'actor')
      response = this.searchPeople()
    else
      response = this.searchKeyword()

    return response.pipe(
      map( (data) => JSON.parse(JSON.stringify(data))),
      catchError( (err) => {
        throw new Error(`${err.status} - ${err.statusText}: ${err.error.status_message}`)
      })
    )
  }

  private searchTitleURL = 'https://api.themoviedb.org/3/search/movie?'
  private searchTitle(): Observable<any> {
    return this.http.get(this.searchTitleURL, this.options)
  }

  private searchPeopleURL = 'https://api.themoviedb.org/3/search/person?'
  searchPeople(): Observable<any> {
    return this.http.get(this.searchPeopleURL, this.options)
  }

  private searchKeywordURL = 'https://api.themoviedb.org/3/search/keyword?'
  searchKeyword(): Observable<any> {
    return this.http.get(this.searchKeywordURL, this.options)
  }
}
