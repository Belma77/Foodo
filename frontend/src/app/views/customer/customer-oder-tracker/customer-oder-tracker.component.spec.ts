import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOderTrackerComponent } from './customer-oder-tracker.component';

describe('CustomerOderTrackerComponent', () => {
  let component: CustomerOderTrackerComponent;
  let fixture: ComponentFixture<CustomerOderTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOderTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOderTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
