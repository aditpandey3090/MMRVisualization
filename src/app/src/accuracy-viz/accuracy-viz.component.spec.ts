import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuracyVizComponent } from './accuracy-viz.component';

describe('AccuracyVizComponent', () => {
  let component: AccuracyVizComponent;
  let fixture: ComponentFixture<AccuracyVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccuracyVizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccuracyVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
