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
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  subject = webSocket('ws://localhost:4200/');
  currentOrder:OrderForm | null = null;
  pendingOrders:Order[] = [];
  orders:Order[] = [];
  newOrder: any;
  success:boolean=false;
  restaurant:Restaurant|null=null;
  constructor(private http:HttpClient, private requestService:CoreRequestService, private courierService: CourierService, private modal:NgbModal) {
      //this.pendingOrders.push(order);
   }

  addProductToOrder(product:Product) {
    if(!this.currentOrder)
    {
      this.currentOrder = new OrderForm();
      this.currentOrder.orderRecords = {};
    }
    if(this.currentOrder.orderRecords && this.currentOrder.orderRecords[product.id])
    {
      var ol = this.currentOrder.orderRecords[product.id];
      ol!.quanity++;
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

   async makeOrder(retraurant: Restaurant|null) {

    if(retraurant==null)
    {
      
      retraurant=this.restaurant;
    }

    let order = new OrderPost;
    order.restaurantId = retraurant!.id!;
    Object.keys(this.currentOrder!.orderRecords).map((key: string) => {
      let value = this.currentOrder!.orderRecords[key];
      let orderRecords = new OrderRecordForm();
      orderRecords.productId = value.product.id;
      orderRecords.quanity = value.quanity;
      order.orderRecords.push(orderRecords);
    })
    await this.Pay(order);
   
  }

async createOrder(order:any)
{
  await this.requestService.post('/Orders', order)
  .then(data => {
    console.log(data)
  })
  .catch(e => console.log(e));
}

 async Pay(order:any)
{
  this.success=false;
  var stripe=Stripe('pk_test_51Kw0aQKRuZYR6PFuWr7T06KwduEmYLRK07ovV0aGsKLAe41y8Tq8FfVTCxyULkyn2p2SSWNkv5qWBMqM04D6DoKf005ruX3VcY');
  
  this.requestService.post('/customer/session/create', order)
    .then(async (response) => {
      
      window.location.href=response;
      this.success=true;
      await this.createOrder(order);

    })
    .then(async (session: any) => {
      
      
      stripe.redirectToCheckout({sessionId:session.id});

    })
    .catch((error:any)=> {})
    
}

  sendToCourier(order:Order) {
    if(order!=null)
    {
    const modalRef = this.modal.open(PopUpComponent);
    modalRef.componentInstance.title = 'Imate nadolazeću narudžbu';
    modalRef.componentInstance.data = order;
    }
  }

  

  sendToRestaurant(order:Order)
  {
    if(order!=null)
    {
    const ModalRef = this.modal.open(IncomingOrderComponent);
    ModalRef.componentInstance.title = 'Imate nadolazeću narudžbu';
    ModalRef.componentInstance.data = order;
    }
  }

  async restaurantAcceptOrder(order:Order) {
    // TODO check if this is needed
    // this.addPendingOrder(order);
    this.requestService.patch('/restaurant/accept/order', order)
      .then(() => {
        this.getActiveAndPendingOrders();
      })
      .catch(e => {
        console.log(e)
      })
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

  }
  
  getUnratedOrder(){
     return this.requestService.get('/Orders/GetUnrated')
     .catch(err=>{
         console.log(err);
    });
}

  getCompletedOrders(){
    return this.requestService.get('/Orders/Completed').catch(err=>{
      console.log(err);
    })
  }

  async getActiveAndPendingOrders() : Promise<any> {
      this.requestService.get("/Orders/pendingAndActive").then(data => {
        console.log(data);
        this.orders = data;
      }).catch(err => {
        console.log(err)
      })
  }

  updateOrderStatus(orderId:number, status:OrderStatus):Promise<any>
  {
  var object={'orderId':orderId, 'status':status};
   return this.requestService.put('/Orders/updateStatus', object);
   
  }
}
