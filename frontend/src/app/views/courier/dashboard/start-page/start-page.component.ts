import { Component, OnInit } from '@angular/core';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  courierIsActive: boolean = false;

  constructor(private courierService: CourierService) { }

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
