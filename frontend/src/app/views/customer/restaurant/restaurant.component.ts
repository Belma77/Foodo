import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Restaurant } from 'src/app/models/restaurant';
import { OrderService } from 'src/app/services/order.service';
import data from '../../../mock/restaurant.json'

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  restaurant!:Restaurant;
  groupedProducts!:Map<string,Product[]>;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private orderService:OrderService,
              private viewportScroller: ViewportScroller) {
   
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let slug = params['slug'];
      let res = data.find(r => r.slug === slug)
      if(!res || res === undefined)
        this.router.navigateByUrl("");
      else
        this.restaurant = res;
      this.transpose()
    });
  }

  transpose() {
    let groupedProducts = new Map<string,Product[]>();
    this.restaurant.products.map(p => {
      if(!groupedProducts.has(p.category.name))
        groupedProducts.set(p.category.name, [p])
      else
        groupedProducts.get(p.category.name)?.push(p)
    })
      this.groupedProducts = groupedProducts;
  }

  public anchorScroll(elementId: string): void { 
      this.viewportScroller.scrollToAnchor(elementId);
  }

  addProductToOrder(p:Product) {
    this.orderService.addProductToOrder(p);
  }

  removeProductFromOrder(p:Product) {
    this.orderService.removeProductFromOrder(p);
  }

  get order() {
    return this.orderService.currentOrder;
  }

  makeOrder() {
    this.orderService.makeOrder(this.restaurant);
  }

}