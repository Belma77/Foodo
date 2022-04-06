import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierRegisterComponent } from './courier-register.component';

describe('CourierRegisterComponent', () => {
  let component: CourierRegisterComponent;
  let fixture: ComponentFixture<CourierRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
