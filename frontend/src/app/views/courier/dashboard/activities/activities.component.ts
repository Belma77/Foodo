import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/models/enums/order-status';
import { Order } from 'src/app/models/order';
import { CourierService } from 'src/app/services/courier.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
opened:boolean[]=[];
orders!:Order[];
id!:number;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getCompletedOrders();
  }

   getCompletedOrders(){
    this.orderService.getCompletedOrders().then((response:Order[])=>{
      this.orders=response;
    })
    console.log(this.orders);
   }

  open(index:number) {
    this.opened[index]=!this.opened[index];

  }
}
