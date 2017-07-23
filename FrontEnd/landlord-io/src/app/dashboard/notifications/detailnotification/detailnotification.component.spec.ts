import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailnotificationComponent } from './detailnotification.component';

describe('DetailnotificationComponent', () => {
  let component: DetailnotificationComponent;
  let fixture: ComponentFixture<DetailnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
