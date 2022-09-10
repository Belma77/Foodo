import {Component, HostListener, OnInit} from '@angular/core';


@Component({
  selector: 'app-customer-oder-tracker',
  templateUrl: './customer-oder-tracker.component.html',
  styleUrls: ['./customer-oder-tracker.component.scss']
})
export class CustomerOderTrackerComponent implements OnInit {
  name = 'Uživo pratite svoju narudžbu';

  public counts = ["U pripremi","Preuzeta","Na putu",
    "Dostavljena"];
  public orderStatus = "U pripremi"
  constructor() {

  }


  ngOnInit(): void {
  }

}
