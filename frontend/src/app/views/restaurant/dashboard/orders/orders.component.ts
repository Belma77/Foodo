import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../../services/order.service";
import {Order} from "../../../../models/order";
import { OrderRecord} from "../../../../models/order-line";
import { OrderStatus } from 'src/app/models/enums/order-status';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[]=[];
  newOrder: boolean=false;
  orderRecords!: Record<string, OrderRecord>;
  async!: Boolean;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getPendingAndActiveOrders();
  }

  async getPendingAndActiveOrders() {
    this.async = true;
    await this.orderService.getActiveAndPendingOrders();
    this.async = false;
  }

  get pendingOrders() : Order[]  {
      return this.orderService.orders.filter(o => o.orderStatus == OrderStatus.CREATED);
  }

  get activeOrders() : Order[] {
    return this.orderService.orders.filter(o => o.orderStatus == OrderStatus.IN_PREPARATION);
}

  acceptOrder(order: Order) {
    this.orderService.restaurantAcceptOrder(order);
  }

  getStatusText(status:string) {
    switch (status) {
      case "CREATED": return "Kreirana";
      case "IN_PREPARATION": return "U pripremi";
      default: return "Nepoznat status";
    }
  }

}
