import { TestBed, inject } from '@angular/core/testing';

import { NotiicationserviceService } from './notiicationservice.service';

describe('NotiicationserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotiicationserviceService]
    });
  });

  it('should ...', inject([NotiicationserviceService], (service: NotiicationserviceService) => {
    expect(service).toBeTruthy();
  }));
});
