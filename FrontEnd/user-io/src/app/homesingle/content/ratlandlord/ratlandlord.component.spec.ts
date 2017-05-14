import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatlandlordComponent } from './ratlandlord.component';

describe('RatlandlordComponent', () => {
  let component: RatlandlordComponent;
  let fixture: ComponentFixture<RatlandlordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatlandlordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatlandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
