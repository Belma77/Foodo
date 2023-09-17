import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Order } from 'src/app/models/order';
import { CourierService } from 'src/app/services/courier.service';
import order from '../../../../mock/order.json'
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "../start-page/pop-up/pop-up.component";
import { SignalRService } from 'src/app/services/signal-r.service';
import { UserService } from 'src/app/services/user.service';
import { Courier } from 'src/app/models/courier.model';

@Component({
  selector: 'app-order-offer',
  templateUrl: './order-offer.component.html',
  styleUrls: ['./order-offer.component.scss']
})
export class OrderOfferComponent implements OnInit {

  order:Order | null = null;
  async! : Boolean;
  /* origin = { lat: 43.3438, lng: 17.8078 };
  destination = { lat: 43.3538, lng: 17.8178 }; */
  origin:any;
  destination:any;
  constructor(public courierService: CourierService, private userService:UserService ) {

  }

  ngOnInit(): void {
    this.getActiveOrder();
  }

  async getActiveOrder() {
    var courier=this.userService.user as Courier;
   
    if(courier.status==0)
    {
      this.async = true;
    await this.courierService.getActiveOrder().then((order:Order) => {
      this.order = order;
      if (order) {
      this.origin={lat:this.order.restaurantLocation.latitude, lng:this.order.restaurantLocation.longitude}
      this.destination={lat:this.order.customerLocation.latitude, lng:this.order.customerLocation.longitude}
      }
      this.async = false;
    }).catch(err => {
      console.log(err);
      this.order = null;
      this.async = false;
    })
  }
}

  getStatusText(status:string) {
    switch (status) {
      case "CREATED": return "Kreirana";
      case "IN_PREPARATION": return "U pripremi";
      case "READY": return "Spremna za dostavu";
      default: return "Nepoznat status";
    }
  }

  acceptOrder () {
    console.log("accept order");
  }

  rejectOrder () {
    console.log("reject order")
  }

}
