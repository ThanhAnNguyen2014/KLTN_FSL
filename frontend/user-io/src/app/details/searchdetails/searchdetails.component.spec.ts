import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdetailsComponent } from './searchdetails.component';

describe('SearchdetailsComponent', () => {
  let component: SearchdetailsComponent;
  let fixture: ComponentFixture<SearchdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
