import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-movie-search-result',
  templateUrl: './movie-search-result.component.html',
  styleUrls: ['./movie-search-result.component.sass']
})
export class MovieSearchResultComponent implements OnInit {

  @Input() data: any
  @Input() result: any
  @Input() error: any
  @Input() paths: string[] = []
  @Input() genres: any

  @Output() retry = new EventEmitter()
  @Output() page = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void { }

  onRetry = () => this.retry.emit()
  onPage = (num: number) => this.page.emit(num+1)
  getGenre(id: number) {
    let genre = this.genres.find( (g: any) => g.id === id )
    return genre.name || "Unknown"
  }
}
