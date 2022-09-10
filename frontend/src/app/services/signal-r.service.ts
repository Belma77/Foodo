import { Injectable } from '@angular/core';
import { LogLevel, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Order } from '../models/order';
import { CourierService } from './courier.service';
import { RestaurantService } from './restaurant.service';
import {OrderService} from "./order.service";
import {PopUpComponent} from "../views/courier/dashboard/start-page/pop-up/pop-up.component";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!:HubConnection;

  constructor(private orderService:OrderService) {

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
      //this.registerListeners();
    })
    .catch(err => console.log('Error while starting connection: ' + err))
  }

  public orderOfferListener = () => {
    this.hubConnection.on('orderOffer', (data:Order) => {
      console.log(data)
      console.log("stigla")
      this.orderService.addPendingOrder(data);
      //this.orderService.open();
    })
  }

  public registerListeners() {
      this.orderOfferListener();
  }
}
