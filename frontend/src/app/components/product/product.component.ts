import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(id:number) {
    fetch('https://fakestoreapi.com/products/' + id,{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
  }

  @Input() product!: Product;
  @Input() edit: boolean = false;

}
