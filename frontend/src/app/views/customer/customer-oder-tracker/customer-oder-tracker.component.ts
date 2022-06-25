import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-customer-oder-tracker',
  templateUrl: './customer-oder-tracker.component.html',
  styleUrls: ['./customer-oder-tracker.component.scss']
})
export class CustomerOderTrackerComponent implements OnInit {
  progresValue:number;
  rangeArray:number[];
  constructor() {
    this.progresValue = 0;
    this.rangeArray = new Array(100);
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const element = document.documentElement,
      body = document.body,
      scrollTop = 'scrollTop',
      scrollHeight = 'scrollHeight';
    this.progresValue =
      (element[scrollTop]||body[scrollTop]) /
      ((element[scrollHeight]||body[scrollHeight]) - element.clientHeight) * 100;
    console.log(this.progresValue);
  }
  ngOnInit(): void {
  }

}
