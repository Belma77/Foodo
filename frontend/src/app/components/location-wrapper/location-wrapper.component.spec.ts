import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWrapperComponent } from './location-wrapper.component';

describe('LocationWrapperComponent', () => {
  let component: LocationWrapperComponent;
  let fixture: ComponentFixture<LocationWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
