import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private restaurantService:RestaurantService) { }

  ngOnInit(): void {
  }

  get pendingOrders() {
    return this.restaurantService.pendingOrders;
  }

}
