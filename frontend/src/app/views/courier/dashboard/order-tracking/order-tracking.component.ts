import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatus } from 'src/app/models/enums/order-status';
import { Location } from 'src/app/models/location';
import { Order } from 'src/app/models/order';
import data from '../../../../mock/order.json'

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


  constructor(private router:Router) {
    this.setCurrentLocation();
    this.order = data;
    this.resLocation = {lat: this.order.restaurant.location.latitude, lng: this.order.restaurant.location.longitude};
    this.cusLocation = {lat: this.order.customer.location.latitude, lng: this.order.customer.location.longitude};
    this.order.orderStatus = OrderStatus.IN_PREPARATION;
  }

  updateStatus(status: String) {
    this.order!.orderStatus = OrderStatus[status as keyof typeof OrderStatus];
  }

  completeOrder() {
    this.router.navigateByUrl("courier/dashboard")
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        this.courierLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
      });
    }
    else {
      console.log("location not enabled, route to main page or prompt error");
    }
  }

  directionToRestaurant() {
    return this.order.orderStatus === OrderStatus.IN_PREPARATION;
  }

  ngOnInit(): void {
    console.log(this.resLocation);
    console.log(this.cusLocation)
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
