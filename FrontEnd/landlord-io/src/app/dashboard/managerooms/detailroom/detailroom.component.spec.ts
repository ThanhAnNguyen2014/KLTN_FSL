import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailroomComponent } from './detailroom.component';

describe('DetailroomComponent', () => {
  let component: DetailroomComponent;
  let fixture: ComponentFixture<DetailroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
