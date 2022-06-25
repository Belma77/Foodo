import { Injectable } from '@angular/core';
import { Order, OrderForm, OrderPost } from '../models/order';
import { OrderLine, OrderLineForm } from '../models/order-line';
import { Product } from '../models/product';
import { Restaurant } from '../models/restaurant';
import { CoreRequestService } from './core-request.service';
import Stripe = stripe.Stripe;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder:OrderForm | null = null;

  constructor(private requestService:CoreRequestService) { }

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

   async makeOrder(retraurant: Restaurant) {
    let order = new OrderPost;
    order.restaurantId = retraurant.id;
    Object.keys(this.currentOrder!.orderLine).map((key: string) => {
      let value = this.currentOrder!.orderLine[key];
      let orderLine = new OrderLineForm;
      orderLine.productId = value.product.id;
      orderLine.quanity = value.quanity;
      order.orderLine.push(orderLine);
    })
     await this.requestService.post('/customer/order/create', order)
      .then(data => console.log(data))
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
  calculatePrice() {
    var orderLines = Object.values(this.currentOrder!.orderLine);
    let totalPrice = 0;
    Object.keys(this.currentOrder!.orderLine).map((key:string) => {
      let value = this.currentOrder!.orderLine[key];
      totalPrice += value.product.price * value.quanity;
    })
    this.currentOrder!.price = totalPrice;
  }
}
