import { Component, OnInit } from '@angular/core';
import { Courier } from 'src/app/models/courier.model';
import { OrderStatus } from 'src/app/models/enums/order-status';
import { Order } from 'src/app/models/order';
import { CourierService } from 'src/app/services/courier.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
opened:boolean[]=[];
orders!:Order[];
id!:number;
  constructor(private orderService:OrderService, private userService:UserService) { }

  ngOnInit(): void {
    this.getCompletedOrders();
  }

   getCompletedOrders(){
    
    this.orderService.getCompletedOrders().then((response:Order[])=>{
      this.orders=response;
    })
    
   }

  open(index:number) {
    this.opened[index]=!this.opened[index];

  }
}
