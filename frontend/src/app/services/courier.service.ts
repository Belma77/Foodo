import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatus } from '../models/enums/order-status';
import { Order } from '../models/order';
import { CoreRequestService } from './core-request.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  order:Order | null = null;

  constructor(private requestService: CoreRequestService, private router:Router) { }

  setStatusActive() {
    this.requestService.patch('/courier/status/active', {});
  }

  setStatusInactive() {
    this.requestService.patch('/courier/status/inacvtive', {});
  }
  courierAcceptOrder(order:Order)
  {
    this.requestService.patch('courier/acceptOrder', order);
  }
  receiveOrderOffer (order:Order) {
    console.log("test")
    this.order = order;
   // this.router.navigateByUrl('/courier/dashboard/order/offer');

  }
}
