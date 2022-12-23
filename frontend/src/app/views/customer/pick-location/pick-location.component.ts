import { MouseEvent } from '@agm/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-location',
  templateUrl: './pick-location.component.html',
  styleUrls: ['./pick-location.component.scss']
})
export class PickLocationComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
 locationChosen=false;
  onClick(event:MouseEvent){
    console.log(event);
    this.lat=event.coords.lat;
    this.lng=event.coords.lng;
    this.locationChosen=true;
  }
  constructor() { }

  ngOnInit(): void {
  }



}
