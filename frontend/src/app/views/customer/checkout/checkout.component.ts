import { Component, OnInit } from '@angular/core';
import {CourierService} from "../../../services/courier.service";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {

  }


}
