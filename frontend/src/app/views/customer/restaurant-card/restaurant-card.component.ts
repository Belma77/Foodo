import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("test")
  }

  @Input() restaurant!: Restaurant;

  get imageUrl() {
    return environment.api + "/download?fileUrl=" + this.restaurant.headerImage;
  }


}
