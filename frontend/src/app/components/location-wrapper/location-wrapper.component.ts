import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-wrapper',
  templateUrl: './location-wrapper.component.html',
  styleUrls: ['./location-wrapper.component.scss']
})
@Injectable({ providedIn: 'root' })
export class LocationWrapperComponent implements OnInit {
  location:Location | null = null;
  @Input() isMapDragable:boolean | undefined; 

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
