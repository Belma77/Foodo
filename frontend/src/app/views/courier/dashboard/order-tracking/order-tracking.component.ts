import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatus } from 'src/app/models/enums/order-status';
import { Location } from 'src/app/models/location';
import { Order } from 'src/app/models/order';
import data from '../../../../mock/order.json'
import { CourierService } from 'src/app/services/courier.service';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  order!:Order;
  OrderStatus = OrderStatus;
  resLocation:any;
  cusLocation:any;
  courierLocation: any;
  zoom: number = 20;
  data:string="U pripremi";
  isOrder:boolean=false;

  constructor(private router:Router, private courierService:CourierService) {
    this.getOrder();
    this.setCurrentLocation();
    //this.resLocation = {lat: this.order.restaurant.location.latitude, lng: this.order.restaurant.location.longitude};
    if(this.order!=null&&this.order!=undefined)
    {
    this.cusLocation = {lat: this.order.customerLocation.latitude, lng: this.order.customerLocation.longitude};
    this.resLocation= new Location();
    this.resLocation.latitude=43.345845;
    this.resLocation.longitude=17.8221036;
    console.log(this.cusLocation)
    console.log(this.resLocation);
    console.log(this.courierLocation);
    this.order!.orderStatus = OrderStatus.IN_PREPARATION;
    
    }

   
  }

  updateStatus(status: String) {
    if(this.order!=null&&this.order!=undefined)
    {
      this.order!.orderStatus = OrderStatus[status as keyof typeof OrderStatus];

    }
  }

  getOrder()
{
  this.isOrder=false;
  var data=localStorage.getItem('order');
  var obj=JSON.parse(data!);
  if(obj!=null&&obj!=undefined)
  {
  this.order=obj;
  //this.order=this.courierService.activeOrder;
  
  this.isOrder=true;
  }
}
  completeOrder() {
    this.router.navigateByUrl("courier/dashboard")
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.courierLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
       // this.courierLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
       // this.courierLocation = {lat: 43.345834, lng: 17.8111036};

      });
    }
    else {
      console.log("location not enabled, route to main page or prompt error");
    }
  }

  directionToRestaurant() {
    return this.order!.orderStatus === OrderStatus.IN_PREPARATION;
  }

  ngOnInit(): void {
  }

public renderOptions = {
    suppressMarkers: true,
}

public restaurantMarkerOptions = {
    origin: {
        icon: "../../../../assets/car.png",
        draggable: true
    },
    destination: {
        icon: '../../../../assets/business.png',
    },
    waypoints: {

    }
}

public customerMarkerOptions = {
  origin: {
      icon: "../../../../assets/car.png",
      draggable: true
  },
  destination: {
    icon: '../../../../assets/flag.png',
  },
  waypoints: {

  }
}

}
