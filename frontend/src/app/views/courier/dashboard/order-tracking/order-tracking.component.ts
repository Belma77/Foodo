import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import data from '../../../../mock/order.json'

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  order!:Order;

  constructor() { 
    // this.or
  }

  ngOnInit(): void {
  }

}
