import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderRecord } from 'src/app/models/order-line';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-order-line',
  templateUrl: './order-line.component.html',
  styleUrls: ['./order-line.component.scss']
})
export class OrderLineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() orderLine!:OrderRecord;
  @Output() incraseQuanityEvent: EventEmitter<Product> = new EventEmitter();
  @Output() decraseQuanityEvent: EventEmitter<Product> = new EventEmitter();

  incraseQuanity() {
    this.incraseQuanityEvent.emit(this.orderLine.product);
  }

  decraseQuanity() {
    this.decraseQuanityEvent.emit(this.orderLine.product);
  }

}
