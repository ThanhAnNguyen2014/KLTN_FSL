import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateHouseComponent } from './rate-house.component';

describe('RateHouseComponent', () => {
  let component: RateHouseComponent;
  let fixture: ComponentFixture<RateHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
