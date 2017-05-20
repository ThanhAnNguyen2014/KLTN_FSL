import { TestBed, inject } from '@angular/core/testing';

import { CreateroomtypeService } from './createroomtype.service';

describe('CreateroomtypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateroomtypeService]
    });
  });

  it('should ...', inject([CreateroomtypeService], (service: CreateroomtypeService) => {
    expect(service).toBeTruthy();
  }));
});
