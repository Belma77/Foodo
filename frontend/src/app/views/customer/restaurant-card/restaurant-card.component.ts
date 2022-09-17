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
    console.log(this.restaurant.headerImage);
    return this.restaurant.headerImage;

  }






}
