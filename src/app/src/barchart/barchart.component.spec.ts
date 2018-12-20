import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { barchart } from './barchart.component';

describe('barchart', () => {
  let component: barchart;
  let fixture: ComponentFixture<barchart>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ barchart ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(barchart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
