import { TestBed, inject } from '@angular/core/testing';

import { EdithouseService } from './edithouse.service';

describe('EdithouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdithouseService]
    });
  });

  it('should ...', inject([EdithouseService], (service: EdithouseService) => {
    expect(service).toBeTruthy();
  }));
});
