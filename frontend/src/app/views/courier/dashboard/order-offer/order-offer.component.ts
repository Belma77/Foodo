import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Order } from 'src/app/models/order';
import { CourierService } from 'src/app/services/courier.service';
import order from '../../../../mock/order.json'

@Component({
  selector: 'app-order-offer',
  templateUrl: './order-offer.component.html',
  styleUrls: ['./order-offer.component.scss']
})
export class OrderOfferComponent implements OnInit {

  counter = 15;
  inter = interval(1000);
  order!:Order;

  lat = 17.8078;
  long = 43.3438;

  origin = { lat: 43.3438, lng: 17.8078 };
  destination = { lat: 43.3538, lng: 17.8178 };

  constructor(private courierService: CourierService) { 
    // this.order = order;
  }

  ngOnInit(): void {
      this.inter.subscribe(() => {
        this.counter--;
        if(this.counter == 0)
          this.rejectOrder();
      })
  }

  // get order () {
  //   return this.courierService.order;
  // }

  acceptOrder () {
    console.log("accept order");
  }

  rejectOrder () {
    console.log("reject order")
  }


  

}