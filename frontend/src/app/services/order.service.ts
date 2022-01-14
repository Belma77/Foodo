import { Injectable } from '@angular/core';
import { Order, OrderForm } from '../models/order';
import { OrderLine } from '../models/order-line';
import { Product } from '../models/product';
import { Restaurant } from '../models/restaurant';
import { CoreRequestService } from './core-request.service';

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
      ol!.price += product.price;
      ol!.quanity++;
      console.log("test")
    }
    else {
      ol = new OrderLine();
      ol.product = product;
      ol.price = product.price;
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
    else
      ol!.price -= p.price;
    if(Object.keys(this.currentOrder!.orderLine).length === 0)
      this.currentOrder = null;
    else
      this.calculatePrice();
  } 

  makeOrder(retraurant:Restaurant) {
    this.currentOrder!.restaurantId = retraurant.id;
    this.requestService.post('/customer/order/create', this.currentOrder)
    .then(data => console.log(data))
    .catch(e => console.log(e))
  }

  calculatePrice() {
    var orderLines = Object.values(this.currentOrder!.orderLine);
    let totalPrice = 0;
    Object.keys(this.currentOrder!.orderLine).map((key:string) => {
      let value = this.currentOrder!.orderLine[key]; 
      totalPrice += value.price;
    })     
    this.currentOrder!.price = totalPrice;
  }
}
