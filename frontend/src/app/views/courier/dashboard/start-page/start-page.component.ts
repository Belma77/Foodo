import {Component, Injectable, OnInit} from '@angular/core';
import { CourierService } from 'src/app/services/courier.service';
import {PopUpComponent} from "./pop-up/pop-up.component";
import {Order} from "../../../../models/order";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from "../../../../services/order.service";
import {SignalRService} from "../../../../services/signal-r.service";
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  courierIsActive: boolean = false;
  newOrder:boolean=false;
  order: any;
  closeResult: string;
   narudzba : any;
  modalOptions:NgbModalOptions;
  constructor(private courierService: CourierService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit(): void {

  }


  setActive() {
    this.courierIsActive = true;
    this.courierService.setStatusActive();

  }
  setInactive() {
    this.courierIsActive = false;
    this.courierService.setStatusInactive();
  }




}
