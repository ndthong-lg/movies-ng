import { TestBed } from '@angular/core/testing';

import { TheMovieDbSearchService } from './themoviedb-search.service';

describe('TheMovieDbSearchService', () => {
  let service: TheMovieDbSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheMovieDbSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
