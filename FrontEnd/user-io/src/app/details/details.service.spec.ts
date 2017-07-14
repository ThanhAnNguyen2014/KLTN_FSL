import { TestBed, inject } from '@angular/core/testing';

import { DetailsService } from './details.service';

describe('DetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsService]
    });
  });

  it('should ...', inject([DetailsService], (service: DetailsService) => {
    expect(service).toBeTruthy();
  }));
});
