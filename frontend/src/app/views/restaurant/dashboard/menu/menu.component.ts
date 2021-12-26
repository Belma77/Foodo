import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  products:Product[] = [];

  constructor() { }

  ngOnInit(): void {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data => this.products = data)
            .catch(err => console.log(err))
  }

}
