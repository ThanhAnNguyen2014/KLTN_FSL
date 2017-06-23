import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableformComponent } from './tableform.component';

describe('TableformComponent', () => {
  let component: TableformComponent;
  let fixture: ComponentFixture<TableformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
