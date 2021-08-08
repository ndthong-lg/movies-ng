import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowShowingSearchResultComponent } from './now-showing-search-result.component';

describe('NowShowingSearchResultComponent', () => {
  let component: NowShowingSearchResultComponent;
  let fixture: ComponentFixture<NowShowingSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowShowingSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowShowingSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
