import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuportservicComponent } from './suportservic.component';

describe('SuportservicComponent', () => {
  let component: SuportservicComponent;
  let fixture: ComponentFixture<SuportservicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuportservicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuportservicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
