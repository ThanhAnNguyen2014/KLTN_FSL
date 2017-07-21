import { TestBed, inject } from '@angular/core/testing';

import { NotifyserviceService } from './notifyservice.service';

describe('NotifyserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifyserviceService]
    });
  });

  it('should ...', inject([NotifyserviceService], (service: NotifyserviceService) => {
    expect(service).toBeTruthy();
  }));
});
