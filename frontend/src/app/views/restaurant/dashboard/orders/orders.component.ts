import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../../services/order.service";
import {Order} from "../../../../models/order";
import { OrderRecord} from "../../../../models/order-line";

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
    this.orders=this.orderService.pendingOrders;
    console.log("getting pending orders");     
     return this.orders;

  }



}
