import { TestBed, inject } from '@angular/core/testing';

import { TableformService } from './tableform.service';

describe('TableformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableformService]
    });
  });

  it('should ...', inject([TableformService], (service: TableformService) => {
    expect(service).toBeTruthy();
  }));
});
