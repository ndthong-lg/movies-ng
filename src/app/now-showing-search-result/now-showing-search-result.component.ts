import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-now-showing-search-result',
  templateUrl: './now-showing-search-result.component.html',
  styleUrls: ['./now-showing-search-result.component.sass']
})
export class NowShowingSearchResultComponent implements OnInit {

  @Input() result: any
  @Input() error: any
  @Input() cinemas: any
  @Output() cinemas_required = new EventEmitter<string>()

  selected_cinemas: any = {}

  constructor() { }

  ngOnInit(): void {
  }

  getPosterURL(film: any): string {
    if (film.images.poster["1"])
      return film.images.poster["1"].medium.film_image
    return "http://notfound.com"
  }

  getCinemas(film_id: string) {
    if (this.cinemas && this.cinemas.has(film_id))
      return this.cinemas.get(film_id)

    this.cinemas.set(film_id, [])
    this.cinemas_required.emit(film_id)

    return []
  }

  onCinemaSelected(film_id: string, cinema: any) {
    this.selected_cinemas[film_id] = cinema
  }
}
