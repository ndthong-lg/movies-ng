import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieGluSearchService {

  public set api_key(key: string) {
    this.options.headers["x-api-key"] = key
  }

  public set auth(auth: string) {
    this.options.headers.authorization = auth
  }

  options = {
    observe: 'body' as const,
    responseType: 'json' as const,
    headers: {
      'client': 'HOME_9',
      'x-api-key': '',
      'authorization': '',
      'territory': 'US',
      'api-version': 'v200',
      'geolocation': '',
      'device-datetime': new Date().toISOString()
    }
  }

  constructor(private http: HttpClient) { }

  private nowShowingURL = 'https://api-gate2.movieglu.com/filmsNowShowing'
  searchNowShowing(n: number = 10): Observable<any> {
    return this.http.get(`${this.nowShowingURL}/?n=${n}`, this.options)
      .pipe(
        map( (data) => JSON.parse(JSON.stringify(data))),
        catchError( (err) => {
          throw new Error(`${err.status} - ${err.statusText}: ${err.error.status_message}`)
        })
      )
  }

  private closetShowingURL = 'https://api-gate2.movieglu.com/closetShowing'
  searchClosetShowing(filmId: string, latitude: number, longitude: number): Observable<any> {
    this.options.headers.geolocation = `${latitude};${longitude}`
    return this.http.get(`${this.closetShowingURL}/?film_id=${filmId}`, this.options)
      .pipe(
        map( (data) => JSON.parse(JSON.stringify(data))),
        catchError( (err) => {
          throw new Error(`${err.status} - ${err.statusText}: ${err.error.status_message}`)
        })
      )
  }
}
