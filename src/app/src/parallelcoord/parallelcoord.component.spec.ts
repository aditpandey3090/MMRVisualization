import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallelcoordComponent } from './parallelcoord.component';

describe('ParallelcoordComponent', () => {
  let component: ParallelcoordComponent;
  let fixture: ComponentFixture<ParallelcoordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallelcoordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallelcoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
