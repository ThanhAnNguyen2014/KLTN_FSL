import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithouseComponent } from './edithouse.component';

describe('EdithouseComponent', () => {
  let component: EdithouseComponent;
  let fixture: ComponentFixture<EdithouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
