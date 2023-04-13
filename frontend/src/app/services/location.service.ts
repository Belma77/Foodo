import { Injectable } from "@angular/core";
import { Location } from "../models/location";
import { CoreRequestService } from "./core-request.service";

@Injectable({
    providedIn: 'root'
  })

export class LocationService{
locaton:Location=new Location();
choosen:boolean=false;
  constructor(private requestService:CoreRequestService)
  {
      
  }

    AddLocation(location:Location)
    {
      this.choosen=true;
       this.requestService.post('/Location', location).then(x=>{
        console.log(x);
       }).catch(err=>{
        console.log(err);
       })
    }

    GetLocation()
    {   
      var locations= this.requestService.get('/Location');
      console.log(locations);
      return locations;
    }

    UpdateLocation(location:Location)
    {
      this.choosen=true;
      this.requestService.put('/Location', location);
    }
}