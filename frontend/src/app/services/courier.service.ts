import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewDto } from '../models/dto/review.dto';
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

  async setStatusActive() {
    this.requestService.patch('/courier/status/active', {});
  }

  async setStatusInactive() {
    this.requestService.patch('/courier/status/inactive', {});
  }

  courierAcceptOrder(order:Order)
  {
    console.log(order);
    console.log("courier accepted order");
    this.requestService.patch('/courier/acceptOrder', order).then(x=>{
      console.log(x);
    }).
    catch(err=>{
      console.log(err);
    });
    this.activeOrder=order;
    this.pendingOrders.push(order);
    this.router.navigateByUrl('/courier/dashboard/order/offer');
  }

  receiveOrderOffer (order:Order) {

  }

}
