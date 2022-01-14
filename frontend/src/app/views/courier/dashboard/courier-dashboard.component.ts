import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courier-dashboard',
  templateUrl: './courier-dashboard.component.html',
  styleUrls: ['./courier-dashboard.component.scss']
})
export class CourierDashboardComponent implements OnInit {
  opened: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMenuClick() {
    console.log("test")
    this.opened = !this.opened;
  }

}
