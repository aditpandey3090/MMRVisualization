import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributioncomparisonComponent } from './distributioncomparison.component';

describe('DistributioncomparisonComponent', () => {
  let component: DistributioncomparisonComponent;
  let fixture: ComponentFixture<DistributioncomparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributioncomparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributioncomparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
