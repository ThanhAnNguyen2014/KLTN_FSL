import { TestBed, inject } from '@angular/core/testing';

import { ListhouseService } from './listhouse.service';

describe('ListhouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListhouseService]
    });
  });

  it('should ...', inject([ListhouseService], (service: ListhouseService) => {
    expect(service).toBeTruthy();
  }));
});
