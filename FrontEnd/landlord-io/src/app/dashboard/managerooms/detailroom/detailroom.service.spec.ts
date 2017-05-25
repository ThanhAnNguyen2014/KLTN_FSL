import { TestBed, inject } from '@angular/core/testing';

import { DetailroomService } from './detailroom.service';

describe('DetailroomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailroomService]
    });
  });

  it('should ...', inject([DetailroomService], (service: DetailroomService) => {
    expect(service).toBeTruthy();
  }));
});
