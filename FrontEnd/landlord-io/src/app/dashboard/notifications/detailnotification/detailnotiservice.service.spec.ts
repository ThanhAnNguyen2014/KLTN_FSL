import { TestBed, inject } from '@angular/core/testing';

import { DetailnotiserviceService } from './detailnotiservice.service';

describe('DetailnotiserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailnotiserviceService]
    });
  });

  it('should ...', inject([DetailnotiserviceService], (service: DetailnotiserviceService) => {
    expect(service).toBeTruthy();
  }));
});
