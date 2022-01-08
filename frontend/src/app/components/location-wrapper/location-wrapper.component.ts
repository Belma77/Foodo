import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-location-wrapper',
  templateUrl: './location-wrapper.component.html',
  styleUrls: ['./location-wrapper.component.scss']
})
export class LocationWrapperComponent implements OnInit {

  location:Location | null = null;
  isMapDragable = false; 

  constructor() { }

  ngOnInit(): void {
  }

  changeLocation(location:Location) {
    this.location = location;
  }

  setMap() {
    this.isMapDragable = !this.isMapDragable;
  }

}
