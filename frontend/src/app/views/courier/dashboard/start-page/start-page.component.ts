import {Component, Injectable, OnInit} from '@angular/core';
import { CourierService } from 'src/app/services/courier.service';
import {PopUpComponent} from "./pop-up/pop-up.component";
import {Order} from "../../../../models/order";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from "../../../../services/order.service";
import {SignalRService} from "../../../../services/signal-r.service";
import { UserService } from 'src/app/services/user.service';
import { Courier } from 'src/app/models/courier.model';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  constructor(private courierService: CourierService, private userService:UserService) {

  }

  ngOnInit(): void {

  }

  get courierIsActive() {
    return (this.userService.user as Courier).status;
  }

  
  async setActive() {
    await this.courierService.setStatusActive().then(res => {
      location.reload();
    });
  }

 async setInactive() {
   await this.courierService.setStatusInactive().then(res => {
      location.reload();
    });
  }

}
