import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  products:Product[] = [];

  constructor(private restaurantService: RestaurantService, private userService:UserService) { }

  ngOnInit(): void {
    
    this.restaurantService.getMenu(this.userService.user.id!)
    .then(data => {
      console.log(data);
      this.products = data
    });
  }

}
