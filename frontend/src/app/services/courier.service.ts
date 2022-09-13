import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatus } from '../models/enums/order-status';
import { Order } from '../models/order';
import { CoreRequestService } from './core-request.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
activeOrder: Order = new Order();
  order:Order | null = null;
pendingOrders:Order[]=[];
  constructor(private requestService: CoreRequestService, private router:Router) { }

  setStatusActive() {
    this.requestService.patch('/courier/status/active', {});
  }

  setStatusInactive() {
    this.requestService.patch('/courier/status/inactive', {});
  }
  courierAcceptOrder(order:Order)
  {
    this.requestService.patch('courier/acceptOrder', order)
      .then()

    this.activeOrder=order;
    this.pendingOrders.push(order);
    this.router.navigateByUrl('/courier/dashboard/order/offer');
  }
  receiveOrderOffer (order:Order) {

  }
}
