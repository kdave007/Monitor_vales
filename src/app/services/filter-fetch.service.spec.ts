import { TestBed } from '@angular/core/testing';

import { FilterFetchService } from './filter-fetch.service';

describe('FilterFetchService', () => {
  let service: FilterFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
