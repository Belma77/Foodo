import { Injectable } from '@angular/core';
import { Order, OrderForm, OrderPost } from '../models/order';
import { OrderLine, OrderLineForm } from '../models/order-line';
import { Product } from '../models/product';
import { Restaurant } from '../models/restaurant';
import { CoreRequestService } from './core-request.service';
import Stripe = stripe.Stripe;
import {webSocket} from 'rxjs/WebSocket';
import {CourierService} from "./courier.service";
import {StartPageComponent} from "../views/courier/dashboard/start-page/start-page.component";
import {PopUpComponent} from "../views/courier/dashboard/start-page/pop-up/pop-up.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import order from '../mock/order.json';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  subject = webSocket('ws://localhost:4200/');
  currentOrder:OrderForm | null = null;
  pendingOrders:Order[] = [];
  newOrder: any;
  constructor(private requestService:CoreRequestService, private courierService: CourierService, private modal:NgbModal) {
      this.pendingOrders.push(order);
   }

  addProductToOrder(product:Product) {
    if(!this.currentOrder)
    {
      this.currentOrder = new OrderForm();
      this.currentOrder.orderLine = {};
    }
    console.log("test")
    if(this.currentOrder.orderLine && this.currentOrder.orderLine[product.id])
    {
      var ol = this.currentOrder.orderLine[product.id];
      ol!.quanity++;
      console.log("test")
    }
    else {
      ol = new OrderLine();
      ol.product = product;
      ol.quanity = 1;
      this.currentOrder.orderLine[product.id.toString()] =  ol;
    }
    this.calculatePrice();
  }

  removeProductFromOrder(p:Product) {
    var ol = this.currentOrder!.orderLine[p.id];
    ol!.quanity--;
    if(ol?.quanity === 0)
      delete this.currentOrder!.orderLine[p.id];
    if(Object.keys(this.currentOrder!.orderLine).length === 0)
      this.currentOrder = null;
    else
      this.calculatePrice();
  }
  calculatePrice() {
    var orderLines = Object.values(this.currentOrder!.orderLine);
    let totalPrice = 0;
    Object.keys(this.currentOrder!.orderLine).map((key:string) => {
      let value = this.currentOrder!.orderLine[key];
      totalPrice += value.product.price * value.quanity;
    })
    this.currentOrder!.price = totalPrice;
  }
   async makeOrder(retraurant: Restaurant) {
    let order = new OrderPost;
    order.restaurantId = retraurant.id!;
    Object.keys(this.currentOrder!.orderLine).map((key: string) => {
      let value = this.currentOrder!.orderLine[key];
      let orderLine = new OrderLineForm;
      orderLine.productId = value.product.id;
      orderLine.quanity = value.quanity;
      order.orderLine.push(orderLine);
    })
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
    .then(function(session:any) {
      return stripe.redirectToCheckout({sessionId:session.id}) ;
    })
    .catch((error:any)=> {})
}
  open() {
    const modalRef = this.modal.open(PopUpComponent);
    modalRef.componentInstance.title = 'Imate nadolazeću narudžbu';
    modalRef.componentInstance.data = this.newOrder;
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
      this.newOrder=order;
      this.open();

  }


}
