import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Order, OrderForm} from "../../../../models/order";
import {Router} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {OrderRecord} from "../../../../models/order-line";
import { OrderStatus } from 'src/app/models/enums/order-status';

 @Component({
  selector: 'app-incoming-order',
  templateUrl: './incoming-order.component.html',
  styleUrls: ['./incoming-order.component.scss']
}) 
export class IncomingOrderComponent {
  
  
  @Input()
  data: Order = new Order();;
  @Input() title!:string;
  status?:String;
  constructor(public modal:NgbActiveModal, private router:Router, private orderService:OrderService) {
   
  }

  

  async AcceptOrder(data:Order) {
    console.log("accepting order")
    //this.orderService.restaurantAcceptOrder(data);
    await this.orderService.updateOrderStatus(data.id, OrderStatus.PENDING).then(async (x)=>{
     await this.orderService.getActiveAndPendingOrders();
    })
    this.modal.close();
    this.router.navigateByUrl('/restaurant/admin/dashboard/orders');
  }
}
