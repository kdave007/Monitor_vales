import { TestBed } from '@angular/core/testing';

import { ValesDataService } from './vales-data.service';

describe('ValesDataService', () => {
  let service: ValesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
