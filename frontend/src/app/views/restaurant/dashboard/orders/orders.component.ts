import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import {OrderService} from "../../../../services/order.service";
import {Product} from "../../../../models/product";
import {Order} from "../../../../models/order";
import { OrderRecord} from "../../../../models/order-line";
import {KeyValue} from "@angular/common";
import {P} from "@angular/cdk/keycodes";
//import { stringify } from 'querystring';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[]=[];
  newOrder: boolean=false;
  orderRecords!: Record<string, OrderRecord>;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {


  }

    get pendingOrders() {
      
      console.log("getting pending orders");     
     return this.orders;

  }



}
