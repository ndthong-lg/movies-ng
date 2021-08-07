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
    this.getConfiguration()
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

  constructor(private http: HttpClient) { }

  private configuration: any
  private configurationURL = 'https://api.themoviedb.org/3/configuration'
  private getConfiguration() {
    this.http.get(`${this.configurationURL}?api_key=${this.options.params.api_key}`)
      .pipe(
        map( (data) => JSON.parse(JSON.stringify(data)) ),
        catchError( (err) => {
          console.log(`${err.status} - ${err.statusText}: ${err.error.status_message}`)
          return of([])
        })
      )
      .subscribe( (config) => {
        this.configuration = config
      })
  }

  getProfileBaseURL() {
    return `${this.configuration.images.base_url}/${this.configuration.images.profile_sizes[0]}`
  }

  getLogoBaseURL() {
    return `${this.configuration.images.base_url}/${this.configuration.images.logo_sizes[0]}`
  }

  getPosterBaseURL() {
    return `${this.configuration.images.base_url}/${this.configuration.images.poster_sizes[0]}`
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
