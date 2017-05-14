import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesingleComponent } from './homesingle.component';

describe('HomesingleComponent', () => {
  let component: HomesingleComponent;
  let fixture: ComponentFixture<HomesingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
