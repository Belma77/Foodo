import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOrderComponent } from './incoming-order.component';

describe('IncomingOrderComponent', () => {
  let component: IncomingOrderComponent;
  let fixture: ComponentFixture<IncomingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
