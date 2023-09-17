import { Component, OnInit } from '@angular/core';
import {CourierService} from "../../../../services/courier.service";
import {Order} from "../../../../models/order";
import { UserService } from 'src/app/services/user.service';
import { Courier } from 'src/app/models/courier.model';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

pendingOrder?:Order | null;
//opened:boolean=false;
opened:boolean[]=[];
order:boolean=false;
pendingOrders?:Order[];
  constructor(private courierService:CourierService, private userService:UserService) {}

  ngOnInit(): void {
    this.getPendingOrder();
  }



  getPendingOrder()
  {
    var user=this.userService.user as Courier;
    this.order=false;
    if(user.status==0)
    {
    this.courierService.getPendingOrders().then((res:Order[])=>{
    this.pendingOrders=res;
    this.order=true;
    return this.pendingOrders;
    })
     
  }

  }

  getStatusText(status:string) {
    switch (status) {
      case "CREATED": return "Kreirana";
      case "IN_PREPARATION": return "U pripremi";
      case "READY": return "Spremna za dostavu";
      default: return "Nepoznat status";
    }
  }

 
  open(index:number) {
    this.opened[index]=!this.opened[index];

  }
}
