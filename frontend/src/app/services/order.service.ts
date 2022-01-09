import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { OrderLine } from '../models/order-line';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrder:Order | null = null;

  constructor() { }

  addProductToOrder(product:Product) {
    if(!this.currentOrder)
    {
      this.currentOrder = new Order();
      this.currentOrder.orderLine = new Map<number,OrderLine>();
    }
    if(this.currentOrder.orderLine.has(product.id))
    {
      var ol = this.currentOrder.orderLine.get(product.id);
      ol!.price += product.price;
      ol!.quanity++;
    }
    else {
      ol = new OrderLine();
      ol.product = product;
      ol.price = product.price;
      ol.quanity = 1;
      this.currentOrder.orderLine.set(product.id, ol);
    }
    this.calculatePrice();
  }

  removeProductFromOrder(p:Product) {
    var ol = this.currentOrder!.orderLine.get(p.id);
    ol!.quanity--;
    if(ol?.quanity === 0)
      this.currentOrder!.orderLine.delete(p.id);
    else
      ol!.price -= p.price;
    if(this.currentOrder!.orderLine.size === 0)
      this.currentOrder = null;
    else
      this.calculatePrice();
  

  } 

  calculatePrice() {
    var orderLines = this.currentOrder!.orderLine.values();
    let totalPrice = 0;
    this.currentOrder!.orderLine.forEach((value: OrderLine, key: number) => {
      let pricePerProduct = value.price * value.quanity;
      totalPrice+=pricePerProduct;
  });
  this.currentOrder!.price = totalPrice;
  }
}
