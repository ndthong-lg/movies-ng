import { TestBed } from '@angular/core/testing';

import { MovieGluSearchService } from './movieglu-search.service';

describe('MovieGluSearchService', () => {
  let service: MovieGluSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieGluSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
