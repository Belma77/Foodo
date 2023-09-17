import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../../../../services/order.service";
import {Order} from "../../../../../models/order";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CourierService} from "../../../../../services/courier.service";
import {StartPageComponent} from "../start-page.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  @Input() response: any;
  @Input() title:any;
  @Input() data: Order = new Order();


  constructor(private courierService: CourierService,public modal:NgbActiveModal, public start: StartPageComponent, private router:Router) { }

  ngOnInit(): void {
    
  }

  AcceptOrder(order:Order)
  {
    
    this.courierService.courierAcceptOrder(order);
    this.modal.close();
    this.router.navigateByUrl('/courier/dashboard/order/offer');

  }

}
