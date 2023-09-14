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
<<<<<<< HEAD
  }

  
    get pendingOrders() {
    this.orders=this.orderService.pendingOrders;   
     return this.orders;

=======
    this.getPendingAndActiveOrders();
  }

  async getPendingAndActiveOrders() {
    this.async = true;
    await this.orderService.getActiveAndPendingOrders();
    this.async = false;
>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)
  }

  get pendingOrders() : Order[]  {
      return this.orderService.orders.filter(o => this.mapStatusToEnum(o.orderStatus) == OrderStatus.CREATED);
  }

  get activeOrders() : Order[] {
    return this.orderService.orders.filter(o => this.mapStatusToEnum(o.orderStatus) == OrderStatus.IN_PREPARATION);
}

  acceptOrder(order: Order) {
    this.orderService.restaurantAcceptOrder(order);
  }

  mapStatusToEnum(status:any) {
    switch (status) {
      case 0: return OrderStatus.CREATED;
      case 2: return OrderStatus.IN_PREPARATION;
      default: return null;
    }
  }

  getStatusText(status:any) {
    switch (status) {
      case 0: return "Kreirana";
      case 2: return "U pripremi";
      default: return "Nepoznat status";
    }
  }

}
