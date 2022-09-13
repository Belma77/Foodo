import { Injectable } from '@angular/core';
import  { LogLevel, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Order } from '../models/order';
import { CourierService } from './courier.service';
import { RestaurantService } from './restaurant.service';
import {OrderService} from "./order.service";
import {PopUpComponent} from "../views/courier/dashboard/start-page/pop-up/pop-up.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IncomingOrderComponent} from "../views/restaurant/dashboard/incoming-order/incoming-order.component";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  newOrder:any;
  private hubConnection!:HubConnection;

  constructor(private orderService:OrderService, private modal:NgbModal) {

  }

  public startConnection = () => {
    console.log("test test")

    let token:string | null = localStorage.getItem('token');
    if(!token) {
      return;
    }

    this.hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:5001/hub', {
      accessTokenFactory: () => token!,
      withCredentials:false
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Debug)
    .build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('Connection started');
      this.registerListeners();
    })
    .catch(err => console.log('Error while starting connection: ' + err))
  }

  public orderOfferListener = () => {
    this.hubConnection.on('orderOffer', (data:Order) => {
      console.log(data)
      console.log("stigla")
      const ModalRef = this.modal.open(IncomingOrderComponent);
      ModalRef.componentInstance.title = 'Imate nadolazeću narudžbu';
      //order.orderStatus=this.makeOrderStatus(order);
      ModalRef.componentInstance.data = data;
      //this.orderService.sendToCourier(data);
     // this.orderService.sendToRestaurant(data);
      //this.orderService.addPendingOrder(data);
   })
  }

  public registerListeners() {
      this.orderOfferListener();
  }
}
