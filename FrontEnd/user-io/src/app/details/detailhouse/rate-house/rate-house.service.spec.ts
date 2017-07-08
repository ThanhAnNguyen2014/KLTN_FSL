import { TestBed, inject } from '@angular/core/testing';

import { RateHouseService } from './rate-house.service';

describe('RateHouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateHouseService]
    });
  });

  it('should ...', inject([RateHouseService], (service: RateHouseService) => {
    expect(service).toBeTruthy();
  }));
});
