import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private orderService:OrderService, private restaurantService:RestaurantService) { }

  ngOnInit(): void {
  }

  deleteProduct(id:number) {
    console.log(id)
    this.restaurantService.deleteProduct(id);
  }

  addProductToOrder() {
    this.orderService.addProductToOrder(this.product);
  }

  @Input() product!: Product;
  @Input() edit: boolean = false;

}
