import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Order } from 'src/app/models/order';
import { CourierService } from 'src/app/services/courier.service';
import order from '../../../../mock/order.json'
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "../start-page/pop-up/pop-up.component";
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-order-offer',
  templateUrl: './order-offer.component.html',
  styleUrls: ['./order-offer.component.scss']
})
export class OrderOfferComponent implements OnInit {

<<<<<<< HEAD
  counter = 15;
  inter = interval(1000);
  order!: Order;
  data!:string;
  lat = 17.8078;
  long = 43.3438;

  origin = { lat: 43.3438, lng: 17.8078 };
  destination? : any;
  isOrder:boolean=false;
  constructor(public courierService: CourierService, private signalRservice:SignalRService ) {
=======
  order:Order | null = null;
  async! : Boolean;
  origin!: any;
  destination!:any;

  constructor(public courierService: CourierService ) {
>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)

  }

  ngOnInit(): void {
    this.getActiveOrder();
  }

<<<<<<< HEAD
getOrder()
{
 // this.order=this.courierService.activeOrder;
 this.data=localStorage.getItem('order')!;
 this.order=JSON.parse(this.data);
 console.log("courier order"+this.order);
  this.isOrder=false;
  if(this.order.customerLocation!=null&&this.order.customerLocation!=undefined)
  {
    this.destination=this.order.customerLocation;
    this.isOrder=true;
  }
  
  return this.order;
}
=======
  async getActiveOrder() {
    this.async = true;
    await this.courierService.getActiveOrder().then(order => {
      console.log("order", order);
      this.order = order;
      if (order) {
        this.origin=order.restaurant.location;
        this.destination==order.customerLocation;
      }
      this.async = false;
    }).catch(err => {
      console.log(err);
      this.order = null;
      this.async = false;
    })
  }

// getOrder()
// {
//   this.order=this.courierService.activeOrder;
//   this.destination=this.order.customerLocation;
//   return this.order;
// }
>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)

  acceptOrder () {
    console.log("accept order");
  }

  rejectOrder () {
    console.log("reject order")
  }

}
