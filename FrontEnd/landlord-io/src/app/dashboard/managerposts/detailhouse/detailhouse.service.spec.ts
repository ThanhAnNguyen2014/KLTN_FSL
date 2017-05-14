import { TestBed, inject } from '@angular/core/testing';

import { DetailhouseService } from './detailhouse.service';

describe('DetailhouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailhouseService]
    });
  });

  it('should ...', inject([DetailhouseService], (service: DetailhouseService) => {
    expect(service).toBeTruthy();
  }));
});
