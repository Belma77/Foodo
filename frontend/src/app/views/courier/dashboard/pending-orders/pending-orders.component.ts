import { Component, OnInit } from '@angular/core';
import {CourierService} from "../../../../services/courier.service";
import {Order} from "../../../../models/order";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {

pendingOrder!:Order;
opened:boolean=false;

  constructor(private courierService:CourierService) {}

  ngOnInit(): void {
    this.getPendingOrder();
  }

  getPendingOrder()
  {
     this.pendingOrder=this.courierService.activeOrder;
     console.log(this.pendingOrder);
     return this.pendingOrder;
  }

  open()
  {
    this.opened=!this.opened;
  }

}
