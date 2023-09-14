import { Injectable, Injector } from '@angular/core';
import  { LogLevel, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Order } from '../models/order';
import { CourierService } from './courier.service';
import { RestaurantService } from './restaurant.service';
import {OrderService} from "./order.service";
import {PopUpComponent} from "../views/courier/dashboard/start-page/pop-up/pop-up.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IncomingOrderComponent} from "../views/restaurant/dashboard/incoming-order/incoming-order.component";
import { UserService } from './user.service';
import { UserRole } from '../models/enums/user-role';
import { OrderStatus } from '../models/enums/order-status';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  newOrder!:Order;
  private hubConnection!:HubConnection;

  constructor(private orderService:OrderService, private modal:NgbModal, private injector: Injector) {

  }

  public startConnection = () => {
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
      var role=this.injector.get(UserService).getRole();
      console.log("role", role)

      if(role!=null&&role.valueOf()==UserRole.Restaurant.valueOf())
      {
        console.log("order offer listener for restaurant")
        this.orderService.sendToRestaurant(data);
      }
      if(role!=null&&role==UserRole.Courier.valueOf())
      {
        console.log("order offer listener for courier")
        this.orderService.sendToCourier(data);
      }

      

   })

  }

  public registerListeners() {
      this.orderOfferListener();
  }
}
