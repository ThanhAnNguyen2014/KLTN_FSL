import { TestBed, inject } from '@angular/core/testing';

import { NewhomeService } from './newhome.service';

describe('NewhomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewhomeService]
    });
  });

  it('should ...', inject([NewhomeService], (service: NewhomeService) => {
    expect(service).toBeTruthy();
  }));
});
