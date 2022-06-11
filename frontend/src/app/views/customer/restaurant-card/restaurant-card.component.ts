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
  }

  @Input() restaurant!: Restaurant;

  get imageUrl() {
    return environment.api + "/download?fileUrl=" + this.replaceBackslashes(this.restaurant.headerImage);
  }

  replaceBackslashes(url:string) {
    return url.replace(/\\/g, "/");
  }
}
