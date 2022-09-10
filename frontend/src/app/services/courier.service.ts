import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatus } from '../models/enums/order-status';
import { Order } from '../models/order';
import { CoreRequestService } from './core-request.service';
import order from '../mock/order.json'


@Injectable({
  providedIn: 'root'
})
export class CourierService {

  order:Order | null = null;

  constructor(private requestService: CoreRequestService, private router:Router) { 
    this.order = order;
  }

  setStatusActive() {
    this.requestService.patch('/courier/status/active', {});
    // TODO add 3 seconds timeout and call function
    this.receiveOrderOffer(order)
  }

  setStatusInactive() {
    this.requestService.patch('/courier/status/inacvtive', {});
  }

  receiveOrderOffer (order:Order) {
    this.order = order;
    this.router.navigateByUrl('/courier/dashboard/order/offer')
  }
}
