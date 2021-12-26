import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import data from '../../../mock/restaurant.json'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  restaurants:Restaurant[]

  constructor() {
      this.restaurants = data;
   }

  ngOnInit(): void {
  }

}
