import {Injectable} from '@angular/core';
import {Order, OrderForm, OrderPost} from '../models/order';

import {OrderRecord, OrderRecordForm} from '../models/order-line';

import {Product} from '../models/product';
import {Restaurant} from '../models/restaurant';
import {CoreRequestService} from './core-request.service';
import {webSocket} from 'rxjs/WebSocket';
import {CourierService} from "./courier.service";
import {PopUpComponent} from "../views/courier/dashboard/start-page/pop-up/pop-up.component";


import order from '../mock/order.json';


import {IncomingOrderComponent} from "../views/restaurant/dashboard/incoming-order/incoming-order.component";

import {ModalDismissReasons, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {OrderStatus} from "../models/enums/order-status";
import Stripe = stripe.Stripe;


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  subject = webSocket('ws://localhost:4200/');
  currentOrder:OrderForm | null = null;
  pendingOrders:Order[] = [];
  newOrder: any;


  constructor(private requestService:CoreRequestService, private courierService: CourierService, private modal:NgbModal) {
      //this.pendingOrders.push(order);
   }



  addProductToOrder(product:Product) {
    if(!this.currentOrder)
    {
      this.currentOrder = new OrderForm();
      this.currentOrder.orderRecords = {};
    }
    console.log("test")
    if(this.currentOrder.orderRecords && this.currentOrder.orderRecords[product.id])
    {
      var ol = this.currentOrder.orderRecords[product.id];
      ol!.quanity++;
      console.log("test")
    }
    else {
      ol = new OrderRecord();
      ol.product = product;
      ol.quanity = 1;
      this.currentOrder.orderRecords[product.id.toString()] =  ol;
    }
    this.calculatePrice();
  }

  removeProductFromOrder(p:Product) {
    var ol = this.currentOrder!.orderRecords[p.id];
    ol!.quanity--;
    if(ol?.quanity === 0)
      delete this.currentOrder!.orderRecords[p.id];
    if(Object.keys(this.currentOrder!.orderRecords).length === 0)
      this.currentOrder = null;
    else
      this.calculatePrice();
  }
  calculatePrice() {
    var orderRecords = Object.values(this.currentOrder!.orderRecords);
    let totalPrice = 0;
    Object.keys(this.currentOrder!.orderRecords).map((key:string) => {
      let value = this.currentOrder!.orderRecords[key];
      totalPrice += value.product.price * value.quanity;
    })
    this.currentOrder!.price = totalPrice;
  }
   async makeOrder(retraurant: Restaurant) {
    let order = new OrderPost;
    order.restaurantId = retraurant.id!;
    Object.keys(this.currentOrder!.orderRecords).map((key: string) => {
      let value = this.currentOrder!.orderRecords[key];
      let orderRecords = new OrderRecordForm();
      orderRecords.productId = value.product.id;
      orderRecords.quanity = value.quanity;
      order.orderRecords.push(orderRecords);
    })
    console.log(order.orderRecords)
     await this.requestService.post('/customer/order/create', order)
      .then(data => {
        console.log(data)
      })
      .catch(e => console.log(e))
     await this.Pay(order);

  }
 async Pay(order:any)
{
  var stripe=Stripe('pk_test_51Kw0aQKRuZYR6PFuWr7T06KwduEmYLRK07ovV0aGsKLAe41y8Tq8FfVTCxyULkyn2p2SSWNkv5qWBMqM04D6DoKf005ruX3VcY');

  this.requestService.post('/customer/session/create', order)
    .then(function(response) {
      window.location.href=response;
    })
    .then((session: any) => {
      return stripe.redirectToCheckout({sessionId:session.id})
    })
    .catch((error:any)=> {})


}

  sendToCourier(order:Order) {
    const modalRef = this.modal.open(PopUpComponent);
    modalRef.componentInstance.title = 'Imate nadolazeću narudžbu';
    //order.orderStatus=this.makeOrderStatus(order);
    //modalRef.componentInstance.data = order;
   // console.log("send to courier");
  }
  makeOrderStatus(order:Order)
  {
    if(order.orderStatus==OrderStatus.IN_PREPARATION)
      return "U pripremi";
    if(order.orderStatus==OrderStatus.CREATED)
      return "Kreirana";
    if(order.orderStatus==OrderStatus.COMPLETED)
      return "Spremna za dostavu";
    else {
      return order.orderStatus?.valueOf();
    }
  }
  sendToRestaurant(order:Order)
  {
    const ModalRef = this.modal.open(IncomingOrderComponent);
    ModalRef.componentInstance.title = 'Imate nadolazeću narudžbu';
    //order.orderStatus=this.makeOrderStatus(order);
    ModalRef.componentInstance.data = order;
    console.log("send to res");
    console.log(order);
    this.addPendingOrder(order);
  }
  restaurantAcceptOrder(order:Order) {
    this.requestService.patch('/restaurant/accept/order', order)
      .then(() => {
        console.log("update status u pripremi");
      })
      .catch(e => {
        console.log(e)
      })
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addPendingOrder(order:Order) {
    let contains = false;
    this.pendingOrders.map(o => {
      if(o.id === order.id) {
        contains = true;
      }
    })

    if(!contains)
      this.pendingOrders.push(order);
    console.log(this.pendingOrders);

  }
}
