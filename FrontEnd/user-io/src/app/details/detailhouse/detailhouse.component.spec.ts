import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailhouseComponent } from './detailhouse.component';

describe('DetailhouseComponent', () => {
  let component: DetailhouseComponent;
  let fixture: ComponentFixture<DetailhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
