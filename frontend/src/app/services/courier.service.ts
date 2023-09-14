import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewDto } from '../models/dto/review.dto';
import { OrderStatus } from '../models/enums/order-status';
import { Order } from '../models/order';
import { CoreRequestService } from './core-request.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

activeOrder: Order | null = null;

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
    this.requestService.patch('/courier/acceptOrder', order).then((x:Order)=>{
      console.log(x);
    }).
    catch(err=>{
      console.log(err);
    });
    this.activeOrder=order;
<<<<<<< HEAD
    //this.pendingOrders.push(order);
=======
>>>>>>> 97f3f1d (fix restaurant order listing, lots of smaller fixes)
    this.router.navigateByUrl('/courier/dashboard/order/offer');
  }

 

  getActiveOrder() :Promise<any> {
    return this.requestService.get('/order/active');
  }

}
