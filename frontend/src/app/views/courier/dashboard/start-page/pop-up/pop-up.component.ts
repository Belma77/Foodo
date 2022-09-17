import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../../../../services/order.service";
import {Order} from "../../../../../models/order";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CourierService} from "../../../../../services/courier.service";
import {StartPageComponent} from "../start-page.component";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  @Input() response: any;
  @Input() title:any;
<<<<<<< HEAD
  @Input() data: Order = new Order();
=======
  @Input() data: Order | undefined;
>>>>>>> ef2436dee2d25f46afc90e584ab73ca10b4930b0

  constructor(private courierService: CourierService,public modal:NgbActiveModal, public start: StartPageComponent) { }

  ngOnInit(): void {

  }
  AcceptOrder(order:Order)
  {
    this.courierService.courierAcceptOrder(order);
    this.modal.close();

  }

}
