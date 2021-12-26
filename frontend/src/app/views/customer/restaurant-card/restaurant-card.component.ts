import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

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
}
