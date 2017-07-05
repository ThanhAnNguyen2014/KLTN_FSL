import { TestBed, inject } from '@angular/core/testing';

import { ChangepassService } from './changepass.service';

describe('ChangepassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangepassService]
    });
  });

  it('should ...', inject([ChangepassService], (service: ChangepassService) => {
    expect(service).toBeTruthy();
  }));
});
