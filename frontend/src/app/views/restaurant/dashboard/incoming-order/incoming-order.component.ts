import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Order, OrderForm} from "../../../../models/order";
import {Router} from "@angular/router";
import {OrderService} from "../../../../services/order.service";
import {OrderRecord} from "../../../../models/order-line";

 @Component({
  selector: 'app-incoming-order',
  templateUrl: './incoming-order.component.html',
  styleUrls: ['./incoming-order.component.scss']
}) 
export class IncomingOrderComponent {
  
  
  @Input()
  data: Order = new Order();;
  @Input() title!:string;
  constructor(public modal:NgbActiveModal, private router:Router, private orderService:OrderService) {

  }

  AcceptOrder(data:Order) {
    this.orderService.restaurantAcceptOrder(data);
    console.log("ovo je modal data");
    console.log(data);
    this.modal.close();
    this.router.navigateByUrl('/restaurant/admin/dashboard/orders');
  }
}
