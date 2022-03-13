import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  products:Product[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getProducts(1)
    .then(data => {
      console.log(data);
      this.products = data
    });
  }

}
