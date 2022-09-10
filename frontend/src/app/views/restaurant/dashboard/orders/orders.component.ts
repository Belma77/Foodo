import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import {OrderService} from "../../../../services/order.service";
import {Product} from "../../../../models/product";
import {Order} from "../../../../models/order";
import { OrderLine } from 'src/app/models/order-line';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] | undefined;
  newOrder: boolean=false;
  OrderLine:Map<string,OrderLine[]>=new Map<string, OrderLine[]>();
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {


  }

    get pendingOrders() {
      console.log("getting pending orders");
      return this.orderService.pendingOrders;

  }


}
