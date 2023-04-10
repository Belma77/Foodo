import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedAdressesComponent } from './used-adresses.component';

describe('UsedAdressesComponent', () => {
  let component: UsedAdressesComponent;
  let fixture: ComponentFixture<UsedAdressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedAdressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedAdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
