import { TestBed } from '@angular/core/testing';

import { ValesStateTableService } from './vales-state-table.service';

describe('ValesStateTableService', () => {
  let service: ValesStateTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValesStateTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
