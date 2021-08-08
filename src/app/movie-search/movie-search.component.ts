import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

export interface SearchData {
  searchType: string,
  keyword: string,
}

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent implements OnInit {
  placeholders = new Map()
    .set('all', 'Enter keywords for movie search...')
    .set('title', 'Your favorite title')
    .set('people', 'Your favorite people')

  searchData: SearchData = {
    searchType: 'title',
    keyword: '',
  }

  @Input() disabled: boolean = false
  @Output() public search = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  onSearchTypeChanged(type: string): void {
    this.searchData.searchType = type
  }

  onSearch(): void {
    if (!this.searchData.keyword)
      return
    this.search.emit(this.searchData)
    this.searchData.keyword = ''
  }
}
