import { Component, OnInit } from '@angular/core';
import {CourierService} from "../../../../services/courier.service";
import {Order} from "../../../../models/order";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

pendingOrder?:Order;
opened:boolean=false;
order:boolean=false;
  constructor(private courierService:CourierService) {}

  ngOnInit(): void {
    this.getPendingOrder();
  }

  getPendingOrder()
  {
    this.order=false;
     this.pendingOrder=this.courierService.activeOrder;
     if(this.pendingOrder.customerLocation!=null && this.pendingOrder.customerLocation!=undefined)
     {
      this.order=true;
      
     }
     
     return this.pendingOrder;
  }

  open()
  {
    this.opened=!this.opened;
  }

}
