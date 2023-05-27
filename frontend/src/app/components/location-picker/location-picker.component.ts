import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsedAdressesComponent } from 'src/app/views/customer/used-adresses/used-adresses.component';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {

  zoom: number = 10;
  private geoCoder!:google.maps.Geocoder;
   public form!:FormGroup;
   update:boolean=false;
   note?:string;
   apartment?:string;
   floor?:number;
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @Output() newLocationEvent: EventEmitter<Location> = new EventEmitter();

  @Input() location!: Location;
  @Input() res:any=null;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService:LocationService,
    private router:Router,
    private fb: FormBuilder,
    private orderService:OrderService

    
  ) {
      this.form=this.fb.group({
        search:['', [Validators.required]]
      })
   }
   

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          if(!this.location)
          {
            this.location = new Location();
          }
          this.location.latitude = place.geometry.location.lat();
          this.location.longitude = place.geometry.location.lng();
          this.location.formatedAdress!=place.formatted_address;
          this.zoom = 12;
          this.newLocationEvent.emit(this.location);
        });
      });
    });
    
  }

 

  // Get Current Location Coordinates
  private setCurrentLocation() {
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


  getAddress(latitude:any, longitude:any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          console.log(results[0])
          this.location!.formatedAdress = results[0].formatted_address;
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

  setMap(location:Location) {
    console.log(location);
    if(this.form.valid)
    {
    this.locationService.AddLocation(location);
    this.router.navigateByUrl('/customer/home-page');
    }
    else {
      this.validateAllFields(this.form);
  }
  } 

  get f() {
    return this.form.controls;
}

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFields(control);
        }
    });
 }

 saveLocation()
 {
  if(this.adressExists)
  {
  this.location.apartmentNo =this.apartment;
  this.location.floor=this.floor;
  this.location.note=this.note;
  this.locationService.AddLocation(this.location!);
  
  if(this.orderService.currentOrder!=null)
  {
    this.orderService.makeOrder(null);
  }

  else{
  this.router.navigate(['/customer/home-page'])
  }

  }

  else{
    this.validateAllFields(this.form);
  }
  
 
 }

}

