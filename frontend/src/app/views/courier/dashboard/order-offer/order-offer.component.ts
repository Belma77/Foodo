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

  order:Order | null = null;
  async! : Boolean;
  origin = { lat: 43.3438, lng: 17.8078 };
  destination = { lat: 43.3538, lng: 17.8178 };

  constructor(public courierService: CourierService ) {

  }

  ngOnInit(): void {
    this.getActiveOrder();
  }

  async getActiveOrder() {
    this.async = true;
    await this.courierService.getActiveOrder().then(order => {
      console.log("order offer", order)
      this.order = order;
      // if (order) {
      //   this.origin=order.restaurant.location;
      //   this.destination==order.customerLocation;
      // }
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

  acceptOrder () {
    console.log("accept order");
  }

  rejectOrder () {
    console.log("reject order")
  }

}
