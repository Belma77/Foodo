import { Component, OnInit } from '@angular/core';
import {CourierService} from "../../../../services/courier.service";
import {Order} from "../../../../models/order";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent implements OnInit {
pendingOrders:Order[]=[];
opened:boolean=false;
  constructor(private courierService:CourierService) {

  }

  ngOnInit(): void {
  }
  getPendingOrder()
  {
     this.pendingOrders=this.courierService.pendingOrders;
     return this.pendingOrders;
  }
  open()
  {
    this.opened=!this.opened;
  }

}
