import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isColapsed = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  toggleMenu () {
    this.isColapsed = !this.isColapsed;
  }

  get name() {
    let user = this.userService.user as Restaurant;
    return user.name;
  }

}
