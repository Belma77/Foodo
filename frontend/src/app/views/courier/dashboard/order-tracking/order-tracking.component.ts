import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatus } from 'src/app/models/enums/order-status';
import { Location } from 'src/app/models/location';
import { Order } from 'src/app/models/order';
import data from '../../../../mock/order.json'
import { CourierService } from 'src/app/services/courier.service';
import { SignalRService } from 'src/app/services/signal-r.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Courier } from 'src/app/models/courier.model';

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
  courierLocation!: any;
  zoom: number = 20;
  data:string="U pripremi";
  isOrder:boolean=false;
  orderStatus?:OrderStatus;
  courierStatus:boolean=false;
  constructor(private router:Router, private courierService:CourierService, private orderService:OrderService, private userService:UserService) {
    
    
  }

   updateStatus(status: String) {
    console.log(this.order);
    if(this.order!=null&&this.order!=undefined)
    {
      this.orderStatus= OrderStatus[status as keyof typeof OrderStatus];
      this.order!.orderStatus = OrderStatus[status as keyof typeof OrderStatus];
      this.orderService.updateOrderStatus(this.order.id, this.orderStatus).then((x)=>{
        
      }).catch(err=>{
        console.log(err);
      })
    }
  }

getOrder()
{
  this.isOrder=false;
  var courier=this.userService.user as Courier;
  if(courier.status==0)
  {
  this.courierService.getActiveOrder().then((order:Order) => {
    
    this.order = order;
    
    if(order)
    {
      this.isOrder=true;
      this.setCurrentLocation();
   
    this.cusLocation = {lat: this.order.customerLocation.latitude, lng: this.order.customerLocation.longitude};
    this.resLocation={lat: this.order.restaurantLocation.latitude, lng: this.order.restaurantLocation.longitude};
    this.order!.orderStatus = OrderStatus.IN_PREPARATION; 
    }
    
  }).catch(err => {
    console.log(err);
   // this.order = null;
    //this.async = false;
  })
}
 
}
  completeOrder() {
    this.router.navigateByUrl("courier/dashboard")
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((position) => {
        
       this.courierLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
       (error:any) => {
        console.error("Geolocation error:", error);
      }
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
    this.getOrder();
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
