import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
  }

  deleteProduct(id:number) {
    fetch('https://fakestoreapi.com/products/' + id,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
  }

  addProductToOrder() {
    this.orderService.addProductToOrder(this.product);
  }

  @Input() product!: Product;
  @Input() edit: boolean = false;

}
