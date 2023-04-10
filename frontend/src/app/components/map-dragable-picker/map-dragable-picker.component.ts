import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, Output } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { EventEmitter } from '@angular/core';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { LocationWrapperComponent } from '../location-wrapper/location-wrapper.component';

@Component({
  selector: 'app-map-dragable-picker',
  templateUrl: './map-dragable-picker.component.html',
  styleUrls: ['./map-dragable-picker.component.scss']
})
export class MapDragablePickerComponent implements OnInit {

  zoom: number = 10;
  private geoCoder!:google.maps.Geocoder;

  @Input() location!: Location | null;

  @Output() newLocationEvent: EventEmitter<Location> = new EventEmitter();
  @Output() isMapDragable = true; 

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService:LocationService,
    private router:Router,
    private wrapper:LocationWrapperComponent
    ) { }


  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      if(!this.location)
        this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  // Get Current Location Coordinates
   setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if(!this.location)
          this.location = new Location();
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.location.latitude, this.location.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    if(!this.location)
      this.location = new Location();
    this.location.latitude = $event.coords.lat;
    this.location.longitude = $event.coords.lng;
    this.getAddress(this.location.latitude, this.location.longitude);
    
  }

  getAddress(latitude:any, longitude:any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.location!.formatedAdress = results[0].formatted_address;
          this.newLocationEvent.emit(this.location!);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  get adressExists() {
    return this.location && this.location.latitude && this.location.longitude;
  }


}
