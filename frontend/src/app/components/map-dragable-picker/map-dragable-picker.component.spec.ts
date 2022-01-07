import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDragablePickerComponent } from './map-dragable-picker.component';

describe('MapDragablePickerComponent', () => {
  let component: MapDragablePickerComponent;
  let fixture: ComponentFixture<MapDragablePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDragablePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDragablePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
