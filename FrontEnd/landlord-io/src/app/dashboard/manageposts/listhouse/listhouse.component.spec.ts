import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhouseComponent } from './listhouse.component';

describe('ListhouseComponent', () => {
  let component: ListhouseComponent;
  let fixture: ComponentFixture<ListhouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListhouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
